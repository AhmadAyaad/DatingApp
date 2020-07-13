using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Entities;
using DatingApp.API.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[Controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            if (usersToReturn != null)
                return Ok(usersToReturn);
            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userRepository.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailsDto>(user);
            if (userToReturn != null)
                return Ok(userToReturn);
            return NotFound();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {

            //var user = await _userRepository.GetUser(Convert.ToInt32(ClaimTypes.NameIdentifier));
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var user = await _userRepository.GetUser(id);
            _mapper.Map(userForUpdateDto, user);
            if (await _userRepository.SaveAll())
                return Ok(userForUpdateDto);
            throw new Exception("can not update");
        }

    }
}
