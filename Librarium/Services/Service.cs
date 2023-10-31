using Helpers.AutoMapperProfiles;
using Librarium.Data;
using Librarium.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;

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

        public virtual async Task<string?> Add(T item)
        {
            _dbSet.Add(item);
            await _context.SaveChangesAsync();
            return item.Id;
        }

        public virtual async Task<string?> Delete(string id)
        {
            var result = await _dbSet.FindAsync(id);
            if (result is null)
                return null;
            _dbSet.Remove(result);
            await _context.SaveChangesAsync();
            return id ;
        }

        public virtual async Task<T?> Get(string id)
        {
            var result = _dbSet.AsQueryable();
            result = ApplyInclude(result);
            if (result is null)
                return null;
            var temp = await result.FirstOrDefaultAsync(e => e.Id == id);
            return temp;
        }

        public virtual async Task<List<T>> GetAll(FilterType? filter = null)
        {
            var result = _dbSet.AsQueryable();

            result = ApplyInclude(result);
            result = ApplyFilter(result, filter);

            return await result.ToListAsync();

        }

        public virtual async Task<string?> Update(string id, T request)
        {
            var result = await _dbSet.FindAsync(id);
            if (result is null)
                return null;

            var requestType = request.GetType();
            var resultProperties = typeof(T).GetProperties();

            foreach (var requestProperty in requestType.GetProperties())
            {
                var resultProperty = resultProperties.FirstOrDefault(prop => prop.Name == requestProperty.Name);
                if (resultProperty != null)
                {
                    var value = requestProperty.GetValue(request);
                    if (requestProperty.Name == "Id")
                        continue;
                    resultProperty.SetValue(result, value);
                }
            }
            await _context.SaveChangesAsync();
            return id;
        }
        public virtual IQueryable<T> ApplyInclude(IQueryable<T> query)
        {
            return query;
        }
        public virtual IQueryable<T> ApplyFilter(IQueryable<T> query, FilterType? filter = null)
        { return query; }

        public virtual async Task<string?> AttachAppFile(string appFileId, string OwnerId)
        {
            return await Task.FromResult("");
        }

        public virtual async Task<string> SaveInServer(AppFileRequest request, AppFile item)

        { return await Task.FromResult(""); }
    }
}