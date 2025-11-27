

namespace Users.Api.Dto
{
    // DTO for user registration
    public class UserDto
    {
        public int IdUser { get; set; }
        public string UserName { get; set; }= string.Empty;
        public string Email { get; set; }= string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;
    }
      public class UserReadDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
} 