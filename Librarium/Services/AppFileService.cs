using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class AppFileService : Service<AppFile, DefaultFilter>
    {
        public AppFileService(DataContext context) : base(context) { }
    }

}
