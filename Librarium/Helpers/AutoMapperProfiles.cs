using AutoMapper;
using Librarium.Models;

namespace Helpers.AutoMapperProfiles;


public class AutoMapperProfile<Source, Destination> /*: Profile*/
{
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
        AppFile result = new AppFile() { Extension = source.file!.FileName.Split('.')[1], Name = source.file.FileName, Path = Path.Combine(Directory.GetCurrentDirectory(), "uploads") };
        return result;
    }
}

public class MyMapper : Profile
{
    public MyMapper()
    {
        CreateMap<BookRequest, Book>(MemberList.Source);
        CreateMap<Book, BookResponse>(MemberList.Destination);

        CreateMap<AppFileRequest, AppFile>(MemberList.Source)
            .ForMember(dest => dest.Extension, opt => opt.MapFrom(src => GetFileExtension(src)))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.file!.FileName))
            .ForMember(dest => dest.Path, opt => opt.MapFrom(src=> Path.Combine(Directory.GetCurrentDirectory(), "uploads")));

        CreateMap<AppFile, AppFileResponse>(MemberList.Destination);
        CreateMap<GenreRequest, Genre>(MemberList.Source);
        CreateMap<Genre, GenreResponse>(MemberList.Destination);
        CreateMap<LanguageRequest, Language>(MemberList.Source);
        CreateMap<Language, LanguageResponse>(MemberList.Destination);
        CreateMap<UserRequest, User>(MemberList.Source);
        CreateMap<User, User>(MemberList.Source);
        CreateMap<User, UserResponse>(MemberList.Destination);
    }
    private static string GetFileExtension(AppFileRequest src)
    {
        if (src.file != null && !string.IsNullOrEmpty(src.file.FileName))
        {
            string[] fileNameParts = src.file.FileName.Split('.');
            if (fileNameParts.Length > 1)
            {
                return fileNameParts[fileNameParts.Length - 1];
            }
        }
        return string.Empty;
    }
}

