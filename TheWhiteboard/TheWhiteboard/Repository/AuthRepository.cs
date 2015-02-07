using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TheWhiteboard.Models;

namespace TheWhiteboard.Repository
{
    public class AuthRepository : IDisposable
    {
        public AuthRepository()
        {
        }

        //public async Task<IdentityResult> RegisterUser(User userModel) //UserModel userModel)
        //{
        //    IdentityUser user = new IdentityUser
        //    {
        //        UserName = userModel.Username
        //    };

        //    var result = await _userManager.CreateAsync(user, userModel.Password);

        //    return result;
        //}

        //public async Task<IdentityUser> FindUser(string userName, string password)
        //{
        //    IdentityUser user =  await _userManager.FindAsync(userName, password);
            
        //    return user;
        //}


        public User FindUser(string username, string password)
        {
            var repo = new UserRepository();

            var result = repo.Find(username, password);

            return result;
        }

        public void Dispose()
        {
        }
    }
}