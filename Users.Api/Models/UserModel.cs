using System;
using System.Linq;
using System.Threading.Tasks;
using Users.Api.Models;

namespace Users.Api.Models
{
    public class UserModel
    {
        public int IdUser { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;
        
        public ICollection<ProduccionModel> ProduccionModels { get; set; } = [];
    }
}