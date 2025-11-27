namespace Users.Api.Dto
{
    
    public class AreaCreateUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

// DTO para lectura de Area (salida)
public class AreaReadDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<LineReadDto> Lines { get; set; } = new List<LineReadDto>();
}

// DTO para lectura simple de Line (para incluir en AreaReadDto)

 
}

