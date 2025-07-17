using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace Users.Api.Models
{
    public class PieceModel
    {
        public int IdPiece { get; set; }
        public string NameModel { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CodeModel{ get; set; }

        // Additional properties can be added as needed
    }
}