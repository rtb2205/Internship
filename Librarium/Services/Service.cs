﻿using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class Service<T, FilterType> : IService<T, FilterType> where T : class where FilterType : class
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
            var result = await _dbSet.FindAsync(id);
            if (result is null)
                return null;
            return result;
        }

        public virtual async Task<List<T>> GetAll(FilterType? filter = null)
        {
            var result = await _dbSet.ToListAsync();
            return result;
        }

        public async Task<List<T>?> Update(string id, T request)
        {
            var result = await _dbSet.FindAsync(id);
            if (result is null)
                return null;
            await _context.SaveChangesAsync();
            return await GetAll();
        }
    }
}
