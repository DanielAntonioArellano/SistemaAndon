using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Users.Api.Models;

namespace Users.Api.Models
{
    public class Line
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Area))]
        public int AreaId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public AreaModel Area { get; set; } = null!;
        public ICollection<WorkStation> WorkStations { get; set; } = new List<WorkStation>();
    }
}
