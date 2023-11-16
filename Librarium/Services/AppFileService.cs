using AutoMapper;
using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class AppFileService : Service<AppFile, DefaultFilter>
    {
        public AppFileService(DataContext context, IMapper mapper) : base(context, mapper) 
        {}

        public async Task<string> Add(AppFileRequest request, string ownerId)
        {
            var item = _mapper.Map<AppFile>(request);
            item.Name = ownerId + item.Name;
            await base.Add(item); 
            if (item != null)
            {
                var uploadPath = item.Path;
                var fileName =  $"{item.Name}";
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.file!.CopyToAsync(stream);
                }
            }
            return item!.Id;
        }

        public override async Task<string?> Delete(string id)
        {
            var file = await Get<AppFile>(id);
            var filePath = file!.Path;
            var result = await base.Delete(id);

            if (File.Exists("./uploads/" + file.Name))
            {
                File.Delete("./uploads/" + file.Name);
                return result;
            }
            return $"Error during the deletion of {filePath}";
        }
    }

}
