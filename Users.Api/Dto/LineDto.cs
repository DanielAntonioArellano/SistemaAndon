namespace Users.Api.Dto
{
    // DTO for Line entity
      public class LineCreateUpdateDto
    {
        public int AreaId { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }   
}