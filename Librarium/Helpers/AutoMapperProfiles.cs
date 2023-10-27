using AutoMapper;
using Librarium.Models;

namespace Helpers.AutoMapperProfiles;


public class AutoMapperProfile<Source, Destination> /*: Profile*/
{
    /*public class Source<T>
    {
        public T? Value { get; set; }
    }

    public class Destination<T>
    {
        public T? Value { get; set; }
    }
    public AutoMapperProfile()
    {
        CreateMap(typeof(Source<>), typeof(Destination<>));
        CreateMap<AppFileRequest, AppFile>().ForMember(g => g.Extension, opt => opt.MapFrom(u => u.FormFile!.ContentType)).
             ForMember(g => g.Path, opt => opt.MapFrom(u => u.FormFile!.Name)).ForMember(g => g.Path, opt => Path.Combine(Directory.GetCurrentDirectory(), "uploads"));

    }*/

    public static Destination Transform(Source source)
    {
        var config = new MapperConfiguration(cfg => cfg.CreateMap<Source, Destination>());
        var mapper = new Mapper(config);
        Destination result = mapper.Map<Source, Destination>(source);
        return result;
    }

    public static AppFile Transform (IFormFile source)
    {
        AppFile result = new AppFile() { Extension = source.ContentType, Name = source.FileName, Path = Path.Combine(Directory.GetCurrentDirectory(), "uploads") };
        return result;
    }

    public static AppFile Transform(AppFileRequest source)
    {
        AppFile result = new AppFile() { Extension = source.file.FileName.Split('.')[1], Name = source.file.FileName, Path = Path.Combine(Directory.GetCurrentDirectory(), "uploads") };
        return result;
    }
}

