using System.Text.Json.Serialization; 


namespace Users.Api.Dto
{
    public class WorkStationCreateDto
    {
        public int LineId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class WorkStationReadDto
    {
        [JsonPropertyName("id")]
        public int WorkStationId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;

         
        public List<MachineReadDto> Machines { get; set; } = new();
    }
}