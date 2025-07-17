using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Api.Data;
using Users.Api.Dto;
using Users.Api.Models;
using AutoMapper;

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
        [HttpPost]
        public async Task<ActionResult<WorkStationReadDto>> CreateWorkStation(WorkStationCreateDto createDto)
        {
            var station = _mapper.Map<WorkStation>(createDto);
            _context.WorkStations.Add(station);
            await _context.SaveChangesAsync();

            var readDto = _mapper.Map<WorkStationReadDto>(station);

            return CreatedAtAction(nameof(GetWorkStation), new { id = station.IdWorkStation }, readDto);
        }
    }
}
