using System;

namespace DatingApp.API.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        //for the id which generated to photo from cloudinary 
        public string PublicId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}
