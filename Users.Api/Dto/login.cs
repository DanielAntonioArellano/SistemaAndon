namespace Users.Api.Dto
{

    // DTO for user login
    public class LoginDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}