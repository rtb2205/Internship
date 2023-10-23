
using AutoMapper;
using Librarium.Models;

namespace Helpers.AutoMapperProfiles;

public class Source<T>
{
    public T? Value { get; set; }
}

public class Destination<T>
{
    public T? Value { get; set; }
}

class AutoMapperProfile : Profile
{
    public AutoMapperProfile() {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap(typeof(Source<>), typeof(Destination<>));
            cfg.CreateMap<AppFileRequest, AppFile>().ForMember(g => g.Extension, opt => opt.MapFrom(u => u.FormFile!.ContentType)).
            ForMember(g => g.Path, opt => opt.MapFrom(u => u.FormFile!.Name)).ForMember(g => g.Path, opt => Path.Combine(Directory.GetCurrentDirectory(), "uploads"));

        });
        config.CompileMappings();
    }
}