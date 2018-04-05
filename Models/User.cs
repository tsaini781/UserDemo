
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UserApp.Models
{
    public abstract class BaseEntity
    {
        [Required]
        public virtual int id { get; set; }
        public virtual IEnumerable<ValidationResult> Validate()
        {
            return EntityValidator.ValidateEntity(this);
        }
    }

    public class User : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string name { get; set; }

        [Required]
        [Range(1, 100)]
        public int age { get; set; }

        [StringLength(50)]
        public string address { get; set; }
    }

    public class UserList
    {
        public List<User> users = new List<User>();
        public UserList()
        {
            for (int i = 1; i <= 10; i++)
            {
                User user = new User();
                user.id = i;
                user.name = "Temp " + i;
                user.address = "Address " + i;
                user.age = new Random().Next(1, 90);

                users.Add(user);
            }
        }
    }
}
