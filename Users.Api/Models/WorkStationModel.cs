using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Users.Api.Models
{
    public class WorkStation
    {
        [Key]
        public int WorkStationId { get; set; }

        [ForeignKey(nameof(Line))]  // <-- Vincula explícitamente
        public int LineId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public Line Line { get; set; } = null!;
        public ICollection<Machine> Machines { get; set; } = new List<Machine>();
    }
}
