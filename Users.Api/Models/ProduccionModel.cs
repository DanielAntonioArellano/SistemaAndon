using System;
using System.ComponentModel.DataAnnotations;

namespace Users.Api.Models
{
    public class ProduccionModel
    {
        [Key]
        public int IdProduccion { get; set; }

        public int IdArea { get; set; }
        public int IdLine { get; set; }
        public int IdStation { get; set; }
        public int IdMachine { get; set; }
        public int IdModel { get; set; }
        public int IdUser { get; set; }

        public DateTime DateTime { get; set; }
        public int QuantityProducedOK { get; set; }
        public int QuantityProducedNG { get; set; }

        public TimeSpan ProductionTime { get; set; }
        public TimeSpan ProductionDowntime { get; set; }

        public UserModel User { get; set; } = default!;
    }
}