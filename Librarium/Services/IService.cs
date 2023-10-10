using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public interface IService<T> 
    {
        Task<List<T>> GetAll();
        Task<T?> Get(string id);
        Task<List<T>> Add(T item);
        Task<List<T>?> Update(int id, T request);
        Task<List<T>?> Delete(int id);
    }
}
