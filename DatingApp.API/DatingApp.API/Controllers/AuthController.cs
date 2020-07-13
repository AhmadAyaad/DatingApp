using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Repos;
using System.Threading.Tasks;
using DatingApp.API.Entities;
using DatingApp.API.Dtos;
using DatingApp.API.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace DatingApp.API.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        readonly IAuthRepositery authRepositery;
        readonly IConfiguration _configuration;
        readonly MyContext _context;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepositery repositery, IConfiguration configuration
        , MyContext context, IMapper mapper)
        {
            _mapper = mapper;
            authRepositery = repositery;
            _configuration = configuration;
            _context = context;
        }

        [Authorize]
        [HttpGet("getbla")]
        public IActionResult getbla()
        {
            var user = _context.Users.ToList();
            return Ok(user);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();
            if (await authRepositery.UserExists(userForRegisterDto.UserName))
                return BadRequest("user already exists");

            var createdUser = new User
            {
                UserName = userForRegisterDto.UserName
            };
            await authRepositery.Register(createdUser, userForRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLonginDto userForLonginDto)
        {
            var user = await authRepositery.Login(userForLonginDto.UserName, userForLonginDto.Password);

            if (user == null)
                return Unauthorized();

            var claims = new[]
            {
                    new Claim(ClaimTypes.NameIdentifier ,  user.Id.ToString()) ,
                    new Claim(ClaimTypes.Name , userForLonginDto.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));


            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = creds,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var userToReturn = _mapper.Map<UserForListDto>(user);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                userToReturn
            });
        }
    }
}