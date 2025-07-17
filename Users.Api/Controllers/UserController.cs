
using Microsoft.AspNetCore.Mvc;
using Users.Api.Models;
using Users.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Users.Api.Dto;

namespace Users.Api.Controllers
{
   [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        private UserDto toDto(UserModel user) => new UserDto
        {
            IdUser = user.IdUser,
            UserName = user.UserName,
            Email = user.Email,
            Password = user.Password,
            Rol = user.Rol
        };

        private UserModel ToEntity(UserDto dto) => new UserModel
        {
            IdUser = dto.IdUser,
            UserName = dto.UserName,
            Email = dto.Email,
            Password = dto.Password,
            Rol = dto.Rol
        };

        // POST: api/User/register
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
        {
            if (string.IsNullOrWhiteSpace(registerDto.UserName) ||
                string.IsNullOrWhiteSpace(registerDto.Email) ||
                string.IsNullOrWhiteSpace(registerDto.Password))
            {
                return BadRequest("Todos los campos son obligatorios.");
            }

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == registerDto.UserName || u.Email == registerDto.Email);

            if (existingUser != null)
            {
                return Conflict("El nombre de usuario o email ya está en uso.");
            }

            var newUser = new UserModel
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Password = registerDto.Password, // sin hash
                Rol = registerDto.Rol ?? "User"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var userDto = toDto(newUser);
            return CreatedAtAction(nameof(GetUserById), new { id = userDto.IdUser }, userDto);
        }

        // POST: api/User/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == loginDto.UserName && u.Password == loginDto.Password);

            if (user == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos.");
            }

            return Ok(toDto(user));
        }

        // GET: api/User/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            return Ok(toDto(user));
        }
    }
}