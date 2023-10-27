using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public interface IService<T,FilterType> where FilterType : class
    {
        Task<List<T>> GetAll(FilterType? filter = null);
        Task<T?> Get(string id);
        Task<string?> Add(T item);
        Task<string?> Update(string id, T request);
        Task<string?> Delete(string id);

        }
}
