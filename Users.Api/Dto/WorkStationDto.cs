namespace Users.Api.Dto
{
    public class WorkStationCreateDto
    {
        public int IdLine { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class WorkStationReadDto
    {
        public int IdWorkStation { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}