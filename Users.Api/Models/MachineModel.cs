using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Users.Api.Models
{
    public class Machine
    {
        [Key]
        public int MachineId { get; set; }

        [ForeignKey(nameof(WorkStation))]  // <-- Vincula explícitamente
        public int WorkStationId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";

        public WorkStation WorkStation { get; set; } = null!;
    }
}
