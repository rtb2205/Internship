using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey
    });

    options.OperationFilter<Swashbuckle.AspNetCore.Filters.SecurityRequirementsOperationFilter>();
});

builder.Services.AddDbContext<DataContext>();
builder.Services.AddTransient<Service<Book, BooksFilter>, BookService>();
builder.Services.AddTransient<Service<Genre, DefaultFilter>, GenreService>();
builder.Services.AddTransient<Service<Language, DefaultFilter>, LanguageService>();
builder.Services.AddTransient<Service<AppFile, DefaultFilter>, AppFileService>();
builder.Services.AddTransient<Service<User, DefaultFilter>, UserService>();
//builder.Services.AddTransient<Service<AppFileOwner, DefaultFilter>, OwnerService<AppFileOwner>>();
//builder.Services.AddSingleton<IWebHostEnvironment>();


//builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters { ValidateIssuer = true, ValidIssuer = AuthOptions.ISSUER, ValidateAudience = true, ValidAudience = AuthOptions.AUDIENCE, ValidateLifetime = true, IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(), ValidateIssuerSigningKey = true };
});

builder.Services.AddAuthorization(
    options =>
    {
        options.AddPolicy("Admin", policy => policy.RequireClaim("Admin"));
    });
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                             "http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


public class AuthOptions
{
    public const string ISSUER = "MyAuthServer";
    public const string AUDIENCE = "MyAuthClient";
    public const string KEY = "mySuperSecretKey_secretkey123!";
    public static SymmetricSecurityKey GetSymmetricSecurityKey()
    {
       return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}