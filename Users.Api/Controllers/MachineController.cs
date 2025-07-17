using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Api.Data;
using Users.Api.Models;
using Users.Api.Dto;
using AutoMapper;

namespace Users.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public MachineController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Machine
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MachineReadDto>>> GetMachines()
        {
            var machines = await _context.Machines.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<MachineReadDto>>(machines));
        }

        // GET: api/Machine/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MachineReadDto>> GetMachine(int id)
        {
            var machine = await _context.Machines.FindAsync(id);
            if (machine == null)
                return NotFound();

            return Ok(_mapper.Map<MachineReadDto>(machine));
        }

        // POST: api/Machine
        [HttpPost]
        public async Task<ActionResult<MachineReadDto>> CreateMachine(MachineCreateDto createDto)
        {
            var machine = _mapper.Map<Machine>(createDto);
            _context.Machines.Add(machine);
            await _context.SaveChangesAsync();

            var readDto = _mapper.Map<MachineReadDto>(machine);
            return CreatedAtAction(nameof(GetMachine), new { id = machine.IdMachine }, readDto);
        }

        // PUT: api/Machine/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMachine(int id, MachineUpdateDto updateDto)
        {
            var machine = await _context.Machines.FindAsync(id);
            if (machine == null)
                return NotFound();

            _mapper.Map(updateDto, machine);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Machine/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMachine(int id)
        {
            var machine = await _context.Machines.FindAsync(id);
            if (machine == null)
                return NotFound();

            _context.Machines.Remove(machine);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
