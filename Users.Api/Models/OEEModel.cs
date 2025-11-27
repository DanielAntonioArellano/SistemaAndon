using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 

namespace Users.Api.Models
{
    public class OEEModel
    {
        public int OEEId { get; set; }
        public int MachineId { get; set; }

        public double Availability { get; set; } // Percentage of time the machine is available
        public double Performance { get; set; } // Percentage of performance compared to the ideal cycle time
        public double Quality { get; set; } // Percentage of good quality pieces produced

    
    }
}