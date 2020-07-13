using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Dtos;
using DatingApp.API.Entities;
using DatingApp.API.Helpers;
using DatingApp.API.Repos;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http.OData.Routing;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        readonly IUserRepository _userRepository;
        readonly IMapper _mapper;
        readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        readonly Cloudinary _cloudinary;

        public PhotosController(IUserRepository userRepository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account account = new Account
            {
                Cloud = cloudinaryConfig.Value.CloudName,
                ApiKey = cloudinaryConfig.Value.ApiKey,
                ApiSecret = cloudinaryConfig.Value.ApiSecret
            };
            _cloudinary = new Cloudinary(account);

        }
        //[HttpGet("{id}", Name = nameof(GetPhoto))] 
        [HttpGet("{id}", Name = "GetPhoto")]

        public async Task<IActionResult> GetPhoto(int id , int userId)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
        
            var user = await _userRepository.GetUser(userId);
            var photoFromRepo = await _userRepository.GetPhoto(id);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();
            
            var photoToReturn = _mapper.Map<PhotoToReturnDto>(photoFromRepo);
            
            if (photoToReturn != null)
                return Ok(photoToReturn);
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            if (userId != Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _userRepository.GetUser(userId);
            var file = photoForCreationDto.File;
            //this is the reponse that will be recvied from cloudinary
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        //3shan n3dl fl sora lw hya akbr mn 500 s3tha hy2os mn 3la el 7rof 
                        //we yrkz 3lael wsh 
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    //hna el sora et3mlha upload kda
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            //bn3ml set ll url bta3 el sora bl dto bta3y elly hyro7 el db
            photoForCreationDto.Url = uploadResult.Url.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            //bn3ml map ll photodto ll photo (our original entity)
            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!userFromRepo.Photos.Any(p => p.IsMain))
                photo.IsMain = true;

            userFromRepo.Photos.Add(photo);
            if (await _userRepository.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoToReturnDto>(photo);
                return Ok(photoToReturn);
                //return CreatedAtRoute("GetPhoto",
                //    new { id = photo.Id }, photoToReturn);

            }
            return BadRequest("Could not add the image");

        }


        [HttpPatch("{imageId}/setMain")]
        public async Task<IActionResult> SetUserMainPhoto(int userId, int imageId)
        {
            if (userId != Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier)))
                return Unauthorized();
            var userFromRepo = await _userRepository.GetUser(userId);

            if (!userFromRepo.Photos.Any(p => p.Id == imageId))
                return Unauthorized();

            var photoFromRepo = await _userRepository.GetPhoto(imageId);
            if (photoFromRepo.IsMain == true)
                return BadRequest("Your photo is already your main photo");

            var currentMainPhoto = await _userRepository.GetUserMainPhoto(userId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;
            if (await _userRepository.SaveAll())
                return NoContent();
            return BadRequest("could not make main photo");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            var uId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (userId != uId)
                return Unauthorized();

            var user = await _userRepository.GetUser(uId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photo = await _userRepository.GetPhoto(id);

            if (photo.IsMain)
                return BadRequest("can not delete main photo");

            if (photo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);
                if(result.Result=="ok")
                _userRepository.Delete(photo);
            }
            
            if (photo.PublicId == null)
                _userRepository.Delete(photo);

            if (await _userRepository.SaveAll())
                return Ok();
            
            return BadRequest("Can not delete photo");
        }
    }
}
