using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public interface IService<T,FilterType> where FilterType : class
    {
        Task<List<T>> GetAll(FilterType? filter = null);
        Task<T?> Get(string id);
        Task<List<T>> Add(T item);
        Task<List<T>?> Update(string id, T request);
        Task<List<T>?> Delete(string id);

        }
}
