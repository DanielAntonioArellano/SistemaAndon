using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Users.Api.Data;
using Users.Api.Dto;
using Users.Api.Models;
using Users.Api.Services;
using BCrypt.Net;

namespace Users.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public UserController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        private UserDto ToDto(UserModel user) => new UserDto
        {
            IdUser = user.IdUser,
            UserName = user.UserName,
            Email = user.Email,
            Rol = user.Rol
        };

        // 🔹 Registro de usuario
       [Authorize (Roles = "Admin, Maintenance")]// 👉 No requiere token
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

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            var newUser = new UserModel
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Password = hashedPassword,
                Rol = registerDto.Rol ?? "User"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(ToDto(newUser));
        }

        [AllowAnonymous]// 🔹 Login con JWT
        // 👉 No requiere token
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return Unauthorized("Usuario o contraseña incorrectos.");
            }

            var token = _jwtService.GenerateToken(user.UserName, user.Rol);

            return Ok(new
            {
                user.IdUser,
                user.UserName,
                user.Email,
                user.Rol,
                Token = token
            });
        }

        // 🔹 GET por ID (solo Admin o Mantenimiento, por ejemplo)
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("Usuario no encontrado.");
            return Ok(ToDto(user));
        }

        // 🔹 GET todos los usuarios (solo Admin)
        [Authorize(Roles = "Admin, Maintenance")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users.Select(ToDto));
        }
    }
}
