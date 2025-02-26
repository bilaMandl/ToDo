using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.OpenApi.Models;
using System.Text;
using TodoApi;
using AuthServer.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);
var _configuration = builder.Configuration;
//connection to DB cloud from appsettings.json
// builder.Services.AddDbContext<ToDoDbContext>(options =>
//     options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"), new MySqlServerVersion(new Version(8, 0, 21)))); // ודא שאתה משתמש בגרסה הנכונה
//connect to DB on cloud from render server-site
//1
// var connectionString = Environment.GetEnvironmentVariable("connect-ToDB");
// builder.Services.AddDbContext<ToDoDbContext>(options =>
//     options.UseMySql(connectionString,
//     new MySqlServerVersion(new Version(8, 0, 40))));
// 3
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(_configuration.GetConnectionString("connect-ToDB"),
                     new MySqlServerVersion(new Version(8, 0, 40)),
                     mysqlOptions => mysqlOptions.EnableRetryOnFailure()));
//2
//Server=bxhskhpf2zqlqz0cphw2-mysql.services.clever-cloud.com;Database=bxhskhpf2zqlqz0cphw2;User ID=ufei3enfoonqnquv;Password=Nm0Oku0nfJmnNlvfvYxI;SslMode=Preferred;
// builder.Services.AddDbContext<ToDoDbContext>(options =>
//     options.UseMySql(builder.Configuration.GetConnectionString("connect-ToDB"),
//                       ServerVersion.Parse("8.0-mysql")));

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// הוספת Swagger
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});
builder.Services.AddAuthorization();

// הוספת Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
    };
});

// builder.Services.AddScoped<IItemService,ItemService>();

var app = builder.Build();
app.UseCors("AllowAll");

// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }

app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/", () => Results.Redirect("/swagger"));

// Endpoints for login and registration
app.MapPost("/login", (LoginModel loginModel, ToDoDbContext db) =>
{
    Console.WriteLine("start");
    var user = db.Users?.FirstOrDefault(u => u.UserName == loginModel.UserName && u.Password == loginModel.Password);
    if (user is not null)
    {
        var jwt = CreateJWT(user);
        return Results.Ok(jwt);
    }
    return Results.Unauthorized();
});

app.MapPost("/register", (LoginModel loginModel, ToDoDbContext db) =>
{
    Console.WriteLine("start");
    var name = loginModel.UserName;
    // בדוק אם יש משתמשים לפני שמחשבים את lastId
    var lastId = db.Users?.Any() == true ? db.Users.Max(u => u.Id) : 0;
    var newUser = new User { Id = lastId + 1, UserName = name, Password = loginModel.Password };
    db.Users?.Add(newUser);
    db.SaveChanges();
    var jwt = CreateJWT(newUser);
    return Results.Ok(jwt);
});


object CreateJWT(User user)
{
    var claims = new List<Claim>()
    {
        new Claim("id", user.Id.ToString()),
        new Claim("userName", user.UserName),
    };
    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
    var tokeOptions = new JwtSecurityToken(
        issuer: _configuration.GetValue<string>("JWT:Issuer"),
        audience: _configuration.GetValue<string>("JWT:Audience"),
        claims: claims,
        expires: DateTime.Now.AddDays(30),
        signingCredentials: signinCredentials
    );
    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
    return new { Token = tokenString };
}

// Endpoints for items
app.MapGet("/items", [Authorize]  (ToDoDbContext db) =>  db.Items.ToListAsync());
app.MapGet("/items/{id}", [Authorize] async (int id, ToDoDbContext db) =>
    await db.Items.FindAsync(id) is Item item
        ? Results.Ok(item)
        : Results.NotFound());

app.MapPost("/items", [Authorize] async (Item item, ToDoDbContext db) =>
{
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{item.Id}", item);
});

app.MapPut("/items/{id}", [Authorize] async (int id, Item updatedItem, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();
    item.IsComplete = updatedItem.IsComplete;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/items/{id}", [Authorize] async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();
    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
