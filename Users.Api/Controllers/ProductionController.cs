using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Api.Data;
using Users.Api.Models;
using Users.Api.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Users.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductionController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;



        public ProductionController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Production

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductionReadDto>>> GetProductions()
        {
            var productions = await _context.Productions
                .Include(p => p.User)
                .Include(p => p.Machine)
                    .ThenInclude(m => m.WorkStation)
                        .ThenInclude(ws => ws.Line)
                            .ThenInclude(l => l.Area)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<ProductionReadDto>>(productions));
        }

        // GET: api/Production/5

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductionReadDto>> GetProduction(int id)
        {
            var production = await _context.Productions
                .Include(p => p.Area)
                .Include(p => p.Line)
                .Include(p => p.WorkStation)
                .Include(p => p.Machine)
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.ProductionId == id);

            if (production == null)
                return NotFound();

            return Ok(_mapper.Map<ProductionReadDto>(production));
        }

        // POST: api/Production
        [HttpPost]
        public async Task<ActionResult<ProductionReadDto>> CreateProduction(ProductionCreateDto dto)
        {
            var production = _mapper.Map<ProductionModel>(dto);

            _context.Productions.Add(production);
            await _context.SaveChangesAsync();

            var resultDto = _mapper.Map<ProductionReadDto>(production);

            return CreatedAtAction(nameof(GetProduction), new { id = production.ProductionId }, resultDto);
        }
        // GET: api/Production/filter?startDate=2025-09-01&endDate=2025-09-30&machineId=3
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<ProductionReadDto>>> GetProductionsByFilter(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] int? machineId)
        {
            var query = _context.Productions
                .Include(p => p.User)
                .Include(p => p.Machine)
                    .ThenInclude(m => m.WorkStation)
                        .ThenInclude(ws => ws.Line)
                            .ThenInclude(l => l.Area)
                .AsQueryable();

            // Filtros dinámicos
            if (startDate.HasValue) 
                query = query.Where(p => p.DateTime >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(p => p.DateTime <= endDate.Value);

            if (machineId.HasValue)
                query = query.Where(p => p.MachineId == machineId.Value);

            var productions = await query.ToListAsync();

            return Ok(_mapper.Map<IEnumerable<ProductionReadDto>>(productions));
        }



        // PUT: api/Production/5

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduction(int id, ProductionModel production)
        {
            if (id != production.ProductionId)
                return BadRequest();

            _context.Entry(production).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductionExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Production/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduction(int id)
        {
            var production = await _context.Productions.FindAsync(id);
            if (production == null)
                return NotFound(new { message = $"No se encontró producción con Id = {id}" });

            _context.Productions.Remove(production);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductionExists(int id)
        {
            return _context.Productions.Any(e => e.ProductionId == id);
        }
    }
}
