using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserApp.Models;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UserApp.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
       public static List<User> Users = new UserList().users;

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Users;
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return Users.Where(u => u.id == id).FirstOrDefault();
        }

        // POST api/Users
        [HttpPost]
        public IEnumerable<ValidationResult> Post([FromBody]User user)
        {
            IEnumerable<ValidationResult> errors = user.Validate();
            if (!errors.Any())
            {

                if (user.id == 0)
                {
                    int userid = Users.Select(i => i.id).Max();
                    user.id = userid + 1;
                    Users.Add(user);
                }
                else
                {
                    User existingUser = Users.Where(u => u.id == user.id).FirstOrDefault();
                    existingUser.name = user.name;
                    existingUser.age = user.age;
                    existingUser.address = user.address;
                }
            }
            return errors;
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Users.Remove(Users.Where(u => u.id == id).FirstOrDefault());
        }
    }
}
