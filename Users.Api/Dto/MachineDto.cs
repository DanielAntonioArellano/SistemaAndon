using System.Text.Json.Serialization;
namespace Users.Api.Dto

{
    // DTO for Line entity
    public class MachineCreateDto
    {
        public int WorkStationId { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
         public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
       public class MachineReadDto
    {
        [JsonPropertyName("id")]
        public int MachineId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }

    public class MachineUpdateDto
{
    public int WorkStationId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SerialNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
}