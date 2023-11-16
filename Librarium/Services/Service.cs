using AutoMapper;
using Librarium.Data;
using Librarium.Models;
using AutoMapper;

namespace Librarium.Services
{
    public class Service<T, FilterType> : IService<T, FilterType> where T : Model where FilterType : class
    {
        public DataContext _context;
        public DbSet<T> _dbSet;
        protected IMapper _mapper;

        public Service(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public virtual async Task<string> Add<RequestType>(RequestType request)
        {
            var item = _mapper.Map<T>(request);
            if (item == null)
                return typeof(T) + "is null";
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
            return id;
        }

        public virtual async Task<ResponseType?> Get<ResponseType>(string id)
        {
            var result = _dbSet.AsQueryable();
            result = ApplyInclude(result);
            if (result is null)
                return default(ResponseType);
            var temp = await result.FirstOrDefaultAsync(e => e.Id == id);
            var newItem = _mapper.Map<ResponseType>(temp);
            return newItem;
        }

        public virtual async Task<List<T>> GetAll(FilterType filter)
        {
            var result = _dbSet.AsQueryable();

            result = ApplyInclude(result);
            result = ApplyFilter(result, filter);

            return await result.ToListAsync();

        }

        public virtual async Task<string> Update<RequestType>(string id, RequestType request)
        {
            T newItem = await _dbSet.FindAsync(id); 
            _mapper.Map(request, newItem);
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
    }
}