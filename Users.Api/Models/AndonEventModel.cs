using System;
using System.ComponentModel.DataAnnotations;

namespace Users.Api.Models
{
    public class AndonEventModel
    {
        [Key]
        public int IdEvent { get; set; }

        public int IdMachine { get; set; }
        public int IdFailure { get; set; }
        public int IdUser { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        // Relaciones opcionales (comentadas por ahora)
        // public ICollection<UserModel> Users { get; set; } = [];
    }
}
