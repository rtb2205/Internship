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
        public AppFileService(DataContext context) : base(context) { }

        public override async Task<string> SaveInServer(AppFileRequest request, AppFile item)
        {
            if (item != null)
            {
                var uploadPath = item.Path;
                var fileName =  $"{item.Name}";
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.file.CopyToAsync(stream);
                }
            }
            return "";
        }

        public override async Task<string?> Delete(string id)
        {
            var file = await Get(id);
            var filePath = file.Path;
            var result = await base.Delete(id);

            using (FileStream fs = new FileStream(filePath + "\\" + file.Name, FileMode.Open, FileAccess.Write, FileShare.None))
            {
                if (File.Exists(filePath + "\\" + file.Name + "." + file.Extension))
                {
                   /* System.IO.File.Delete(filePath + "\\" + file.Name + "." + file.Extension);*/
                    return result;
                }
            }
            return $"Error during the deletion of {filePath}";
        }
    }

}
