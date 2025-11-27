using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Api.Data;
using Users.Api.Dto;
using Users.Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Users.Api.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class WorkStationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public WorkStationController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/WorkStation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkStationReadDto>>> GetWorkStations()
        {
            var stations = await _context.WorkStations.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<WorkStationReadDto>>(stations));
        }

        // GET: api/WorkStation/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkStationReadDto>> GetWorkStation(int id)
        {
            var station = await _context.WorkStations.FindAsync(id);

            if (station == null)
                return NotFound();

            return Ok(_mapper.Map<WorkStationReadDto>(station));
        }
        // POST: api/WorkStation
        [Authorize(Roles = "Admin, Maintenance")]
        [HttpPost]
        public async Task<ActionResult<WorkStationReadDto>> CreateWorkStation(WorkStationCreateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var station = _mapper.Map<WorkStation>(createDto);
            _context.WorkStations.Add(station);
            await _context.SaveChangesAsync();
            var resultDto = _mapper.Map<WorkStationReadDto>(station);
            return CreatedAtAction(nameof(GetWorkStation), new { id = station.WorkStationId }, resultDto);
        }

        [Authorize(Roles = "Admin, Mantenimiento")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkStation(int id)
        {
            // Buscar la estación por la PK (WorkStationId) e incluir las máquinas hijas
            var workStation = await _context.WorkStations
                .Include(ws => ws.Machines) // incluir hijos para borrarlos
                .FirstOrDefaultAsync(ws => ws.WorkStationId == id);

            if (workStation == null)
                return NotFound(); // 404 si no existe

            // Eliminar máquinas asociadas primero
            if (workStation.Machines?.Any() == true)
                _context.Machines.RemoveRange(workStation.Machines);

            // Eliminar la estación
            _context.WorkStations.Remove(workStation);

            // Guardar cambios en la DB
            await _context.SaveChangesAsync();

            return NoContent(); // 204
        }


    }
}
