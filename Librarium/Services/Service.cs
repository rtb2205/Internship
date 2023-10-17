using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class Service<T, FilterType> : IService<T, FilterType> where T : Model where FilterType : class
    {
        public DataContext _context;
        public DbSet<T> _dbSet;

        public Service(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<List<T>> Add(T item)
        {
            _dbSet.Add(item);         
            await _context.SaveChangesAsync();
            return await GetAll(); ;
        }

        public async Task<List<T>?> Delete(string id)
        {
            var result  = await _dbSet.FindAsync(id);
            if (result is null)
                return null;
            _dbSet.Remove(result);
            await _context.SaveChangesAsync();
            return await GetAll();
        }

        public virtual async Task<T?> Get(string id)
        {
            var result = _dbSet.AsQueryable();
            result = ApplyInclude(result);
            if (result is null)
                return null;
            return await result.FirstOrDefaultAsync(e => e.Id == id);
        }

        public virtual async Task<List<T>> GetAll(FilterType? filter = null)
        {
            var result = _dbSet.AsQueryable();

            result = ApplyInclude(result);
            result = ApplyFilter(result, filter);

            return await result.ToListAsync();

        }

        public async Task<List<T>?> Update(string id, T request)
        {
            var result = await _dbSet.FindAsync(id);
            if (result is null)
                return null;
            await _context.SaveChangesAsync();
            return await GetAll();
        }
        protected virtual IQueryable<T> ApplyInclude(IQueryable<T> query)
        {
            return query;
        }

        protected virtual IQueryable<T> ApplyFilter(IQueryable<T> query, FilterType? filter = null)
        { return query; }

    }
}
