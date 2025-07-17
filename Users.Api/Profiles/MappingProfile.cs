using AutoMapper;
using Users.Api.Models;
using Users.Api.Dto;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<AreaModel, AreaReadDto>();
         CreateMap<LineCreateUpdateDto, Line>()
            .ForMember(dest => dest.AreaId, opt => opt.MapFrom(src => src.AreaId));

        CreateMap<Line, LineReadDto>();
        CreateMap<AreaCreateUpdateDto, AreaModel>();
        CreateMap<Line, LineReadDto>();
        CreateMap<AreaModel, AreaReadDto>()
        .ForMember(dest => dest.Lines, opt => opt.MapFrom(src => src.Lines));
        CreateMap<WorkStation, WorkStationReadDto>();
        CreateMap<WorkStationCreateDto, WorkStation>();
        CreateMap<Machine, MachineReadDto>();
        CreateMap<MachineCreateDto, Machine>();
        CreateMap<MachineUpdateDto, Machine>();
    }
}