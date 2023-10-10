
using AutoMapper;
using Librarium.Models;

namespace Helpers.AutoMapperProfiles
{
    class AutoMapperProfiles
    {
        public static T Transform<V, T>(V source)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<V, T>());
            var mapper = new Mapper(config);
            T result = mapper.Map<V, T>(source);
            return result;
        }
    }
}