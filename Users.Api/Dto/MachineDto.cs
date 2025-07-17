namespace Users.Api.Dto
{
    // DTO for Line entity
    public class MachineCreateDto
    {
        public int IdWorkStation { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
    }

    public class MachineReadDto
    {
        public int IdMachine { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
    public class MachineUpdateDto
{
    public int IdWorkStation { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
}