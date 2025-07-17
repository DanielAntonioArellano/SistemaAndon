using System;
using System.Linq;
using System.Threading.Tasks;


namespace Users.Api.Models
{
    public class AreaModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public ICollection<Line> Lines { get; set; } = new List<Line>();
    }
}