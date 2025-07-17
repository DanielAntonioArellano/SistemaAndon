using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Api.Data;
using Users.Api.Models;
using Users.Api.Dto;

[ApiController]
[Route("api/[controller]")]
public class AreasController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public AreasController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AreaReadDto>>> GetAreas()
    {
        var areas = await _context.AreaModels.Include(a => a.Lines).ToListAsync();
        return Ok(_mapper.Map<List<AreaReadDto>>(areas));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AreaReadDto>> GetArea(int id)
    {
        var area = await _context.AreaModels.Include(a => a.Lines).FirstOrDefaultAsync(a => a.Id == id);
        if (area == null) return NotFound();
        return Ok(_mapper.Map<AreaReadDto>(area));
    }

    [HttpPost]
    public async Task<ActionResult<AreaReadDto>> PostArea(AreaCreateUpdateDto areaDto)
    {
        var area = _mapper.Map<AreaModel>(areaDto);
        _context.AreaModels.Add(area);
        await _context.SaveChangesAsync();

        var resultDto = _mapper.Map<AreaReadDto>(area);
        return CreatedAtAction(nameof(GetArea), new { id = area.Id }, resultDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutArea(int id, AreaCreateUpdateDto areaDto)
    {
        var area = await _context.AreaModels.FindAsync(id);
        if (area == null) return NotFound();

        _mapper.Map(areaDto, area);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.AreaModels.Any(a => a.Id == id)) return NotFound();
            else throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArea(int id)
    {
        var area = await _context.AreaModels.FindAsync(id);
        if (area == null) return NotFound();

        _context.AreaModels.Remove(area);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
