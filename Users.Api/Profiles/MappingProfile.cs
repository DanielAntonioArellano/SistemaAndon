using AutoMapper;
using Users.Api.Models;
using Users.Api.Dto;
using Users.Api.Dtos;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Áreas
        CreateMap<AreaModel, AreaReadDto>()
            .ForMember(dest => dest.Lines, opt => opt.MapFrom(src => src.Lines)); 
        CreateMap<AreaCreateUpdateDto, AreaModel>();

        // Líneas
        CreateMap<LineCreateUpdateDto, Line>()
            .ForMember(dest => dest.AreaId, opt => opt.MapFrom(src => src.AreaId));
        CreateMap<Line, LineReadDto>();

        // Estaciones
        CreateMap<WorkStationCreateDto, WorkStation>();
        CreateMap<WorkStation, WorkStationReadDto>();

        // Máquinas
        CreateMap<MachineCreateDto, Machine>();
        CreateMap<MachineUpdateDto, Machine>();
        CreateMap<Machine, MachineReadDto>();
        
    
       // Usuario
        CreateMap<UserModel, UserReadDto>();

        // Producción
        CreateMap<ProductionModel, ProductionReadDto>()
            .ForMember(dest => dest.Machine, opt => opt.MapFrom(src => src.Machine))
            .ForMember(dest => dest.WorkStation, opt => opt.MapFrom(src => src.Machine.WorkStation))
            .ForMember(dest => dest.Line, opt => opt.MapFrom(src => src.Machine.WorkStation.Line))
            .ForMember(dest => dest.Area, opt => opt.MapFrom(src => src.Machine.WorkStation.Line.Area));
 
        CreateMap<ProductionCreateDto, ProductionModel>();
        CreateMap<ProductionUpdateDto, ProductionModel>();
    }
}
 