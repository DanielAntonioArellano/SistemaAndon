namespace Users.Api.Dto
{
    // DTO for Line entity
      public class LineCreateUpdateDto
    {
        public int AreaId { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }   
      public class LineReadDto
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // 👇 Esto es clave para visualizar las estaciones en el frontend
        public List<WorkStationReadDto> WorkStations { get; set; } = new();
    }
}
