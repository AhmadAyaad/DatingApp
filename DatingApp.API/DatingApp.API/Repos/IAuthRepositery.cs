using System.Threading.Tasks;
using DatingApp.API.Entities;

namespace DatingApp.API.Repos
{
    public interface IAuthRepositery
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string userName, string password);

        Task<bool> UserExists(string userName);


    }
}