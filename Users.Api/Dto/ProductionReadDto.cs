using System;
using System.Collections.Generic;

namespace Users.Api.Dto
{
    public class ProductionReadDto
    {
        public int ProductionId { get; set; } 
        public DateTime DateTime { get; set; }
        public int QuantityProducedOK { get; set; }
        public int QuantityProducedNG { get; set; }
        public TimeSpan ProductionTime { get; set; }
        public TimeSpan ProductionDowntime { get; set; }

        // Nuevos campos
        public string Model { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Failure { get; set; } = string.Empty;
        public string Operator { get; set; } = string.Empty;

        // Jerarquía relacionada
        public AreaReadDto Area { get; set; } = default!;
        public LineReadDto Line { get; set; } = default!;
        public WorkStationReadDto WorkStation { get; set; } = default!;
        public MachineReadDto Machine { get; set; } = default!;
 
        // Usuario que registró la producción
        public UserReadDto User { get; set; } = default!;
    }
}
