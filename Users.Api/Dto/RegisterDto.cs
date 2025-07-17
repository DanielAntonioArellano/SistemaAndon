namespace Users.Api.Dto;
// DTO for user registration
public class RegisterDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Rol { get; set; }
}