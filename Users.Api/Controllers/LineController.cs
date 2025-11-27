using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Api.Data;
using Users.Api.Dto;
using Users.Api.Models;
namespace Users.Api.Controllers
{

    
    [ApiController]
    [Route("api/[controller]")]
    public class LineController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public LineController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Line
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LineReadDto>>> GetLines()
        {
            var lines = await _context.Lines.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<LineReadDto>>(lines));
        }

        // GET: api/Line/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LineReadDto>> GetLine(int id)
        {
            var line = await _context.Lines.FindAsync(id);

            if (line == null)
                return NotFound();

            return Ok(_mapper.Map<LineReadDto>(line));
        }

        // POST: api/Line
        [Authorize(Roles = "Admin, Maintenance")]
        [HttpPost]
     public async Task<IActionResult> CreateLine(LineCreateUpdateDto dto)
{
    // Validar que AreaId existe en la tabla AreaModels
    bool areaExists = await _context.AreaModels.AnyAsync(a => a.Id == dto.AreaId);
    if (!areaExists)
    {
        return BadRequest($"El AreaId {dto.AreaId} no existe.");
    }

    var line = new Line
    {
        AreaId = dto.AreaId,
        Name = dto.Name,
        Description = dto.Description
    };

    _context.Lines.Add(line);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetLine), new { id = line.Id }, line);
}

        // PUT: api/Line/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLine(int id, LineCreateUpdateDto dto)
        {
            var line = await _context.Lines.FindAsync(id);
            if (line == null)
                return NotFound();

            _mapper.Map(dto, line);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Line/5
        [Authorize(Roles = "Admin, Mantenimiento")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLine(int id)
        {
            var line = await _context.Lines.FindAsync(id);
            if (line == null)
                return NotFound();

            _context.Lines.Remove(line);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
