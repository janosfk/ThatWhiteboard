using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TheWhiteboard.Repository
{
    public class UserRepository
    {
        private DbContext _dbContext;// = new TheWhiteboardEntities();

        public UserRepository()
        {
            //if(dbContext == null)
              //  throw new ArgumentException("context");

            //_dbContext = new TheWhiteboardEntities(); // dbContext;
            
        }

        public User Find(string username, string password)
        {
            using (var ctx = new TheWhiteboardEntities())
            {
                DbSet<User> theUsers = ctx.Set<User>();

                var result = theUsers.Where(u => u.Username == username && u.Password == password).FirstOrDefault();

                return result;
            }
            //DbSet<User> theUsers = _dbContext.Set<User>();

            //var result = theUsers.Where(u => u.Username == username && u.Password == password).FirstOrDefault();

            //return result;
        }

        public void Register(User newUser)
        {
            //DbSet<User> theUsers = _dbContext.Set<User>();
            using (var ctx= new TheWhiteboardEntities())
            {
                try
                {
                    //theUsers.Add(newUser);
                    ctx.Users.Add(newUser);
                    ctx.SaveChanges();
                }
                catch (Exception ex)
                {
                    var err = ex.Message;
                }

                //_dbContext.SaveChanges();
            }
          
        }
    }
}