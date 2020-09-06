using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "your password should be between 4 and 8 chaarcter")]
        public string Password { get; set; }
        [Required]
        public string City{ get; set; }
        [Required]
        public string Country{ get; set; }
        [Required]
        public string Gender{ get; set; }
        [Required]
        public string KnownAs{ get; set; }
        [Required]
        public DateTime DataOfBirth{ get; set; }
        public DateTime Created{ get; set; }
        public DateTime LastActive{ get; set; }

    }
}