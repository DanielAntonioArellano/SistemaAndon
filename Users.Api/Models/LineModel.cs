using System;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Api.Models
{
    public class Line
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

          public AreaModel Area { get; set; } = null!;  // relación a Area
    public ICollection<WorkStation> WorkStations { get; set; } = new List<WorkStation>();
    }
}

