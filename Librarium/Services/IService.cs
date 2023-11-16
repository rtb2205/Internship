using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public interface IService<T,FilterType> where FilterType : class
    {
        Task<List<T>> GetAll(FilterType filter);
        Task<ResponseType?> Get<ResponseType>(string id);
        Task<string> Add<RequestType>(RequestType item);
        Task<string?> Update<RequestType>(string id, RequestType request);
        Task<string?> Delete(string id);

        }
}
