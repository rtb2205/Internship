using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class ImageService : Service<Image, DefaultFilter>
    {
        public ImageService(DataContext context) : base(context) { }
    }

}
