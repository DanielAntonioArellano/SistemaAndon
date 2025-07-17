using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
namespace Users.Api.Models
{
    public class Machine
    {

       [Key]  // Esta etiqueta es importante si el nombre no es Id o similar
        public int IdMachine { get; set; }
        public int IdWorkStation { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = "Active"; // Default status can be "Active", "Inactive", etc.

            public WorkStation WorkStation { get; set; } = null!;  // relaction to WorkStation
    }
}