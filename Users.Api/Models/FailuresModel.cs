using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;



namespace Users.Api.Models
{
    public class Failures
    {
        public int FailureId { get; set; }
        public int CodeFailure { get; set; }
        public string Description { get; set; } = string.Empty;

        public string TypeFailure { get; set; } = string.Empty;
        public string Critically { get; set; } = string.Empty;

    
    }
}