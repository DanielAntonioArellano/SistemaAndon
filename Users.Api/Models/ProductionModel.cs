using System;
using System.ComponentModel.DataAnnotations;

namespace Users.Api.Models
{
    public class ProductionModel
    {
        [Key]
        public int ProductionId { get; set; }

        public int AreaId { get; set; }
        public int LineId { get; set; }
        public int StationId { get; set; }
        public int MachineId { get; set; }

    
        public string Model { get; set; } = string.Empty;

        public int UserId { get; set; }

        public DateTime DateTime { get; set; }
        public int QuantityProducedOK { get; set; }
        public int QuantityProducedNG { get; set; }

        public TimeSpan ProductionTime { get; set; }
        public TimeSpan ProductionDowntime { get; set; }

        
        public string Status { get; set; } = string.Empty;
        public string Failure { get; set; } = string.Empty;
        public string Operator { get; set; } = string.Empty;

        // Relaciones
        public UserModel User { get; set; } = default!;
        public Machine Machine { get; set; } = default!;
        public WorkStation WorkStation { get; set; } = default!;
        public Line Line { get; set; } = default!;
        public AreaModel Area { get; set; } = default!;
    }
}
