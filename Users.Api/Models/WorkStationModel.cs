using System;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Users.Api.Models
{
    public class WorkStation
    {
         [Key]
        public int IdWorkStation { get; set; }
        public int IdLine { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
      
         public Line Line { get; set; } = null!;  // relación a Line
    public ICollection<Machine> Machines { get; set; } = new List<Machine>();
    }
}
