using DatingApp.API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class MyContext : DbContext
    {

        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<User>().HasData(new User
        //    {
        //        UserName = "ayad",
        //        City = "Giza",
        //        Country = "Egypt",
        //        DateOfBirth = new DateTime(1994, 4, 15),
        //        Created = DateTime.Now,
        //        Gender = "male",
        //        Introduction = "Software Engineer",
        //        KnownAs = "3e3o",
        //        LastActive = DateTime.Now,
        //        LookingFor = "Software Engineer Job",
       


        //    });
        //    CreatePasswordHash
        //    base.OnModelCreating(modelBuilder);
        //}
      

        public virtual DbSet<Values> Values { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Photo> Photos { get; set; }

    }
}
