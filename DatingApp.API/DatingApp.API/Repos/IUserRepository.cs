using DatingApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Repos
{
    public interface IUserRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<List<User>> GetUsers();

        Task<User> GetUser(int id);

        Task<bool> SaveAll();
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetUserMainPhoto(int userId);

    }
}
