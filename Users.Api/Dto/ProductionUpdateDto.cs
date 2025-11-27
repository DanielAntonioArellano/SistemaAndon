using System;

namespace Users.Api.Dtos
{
    public class ProductionUpdateDto
    {
        public int ProductionId { get; set; }
        public int AreaId { get; set; }
        public int LineId { get; set; }
        public int StationId { get; set; }
        public int MachineId { get; set; }

        // Ahora string en lugar de int
        public string Model { get; set; } = string.Empty;

        public int UserId { get; set; }

        public DateTime DateTime { get; set; }
        public int QuantityProducedOK { get; set; }
        public int QuantityProducedNG { get; set; }
        public TimeSpan ProductionTime { get; set; }
        public TimeSpan ProductionDowntime { get; set; }

        // Nuevos campos
        public string Status { get; set; } = string.Empty;
        public string Failure { get; set; } = string.Empty;
        public string Operator { get; set; } = string.Empty;
    }
}
