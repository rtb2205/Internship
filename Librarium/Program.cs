using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>();

builder.Services.AddTransient<Service<Book, BooksFilter>, BookService>();
builder.Services.AddTransient<Service<Genre, DefaultFilter>, GenreService>();
builder.Services.AddTransient<Service<Language, DefaultFilter> ,LanguageService>();

builder.Services.AddControllers();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Use((ctx, next) => {
    ctx.Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:3000"; 
    return next();
}
);

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
