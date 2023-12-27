using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;
using UILayer.Data;
using UILayer.Models;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("default");
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AppDbContext>(
		options => options.UseSqlServer(connectionString)
	);
builder.Services.AddIdentity<AppUser, IdentityRole>(
	options =>
	{
		options.Password.RequireUppercase = true;
	}
	)
	.AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
var app = builder.Build();


builder.Services.AddAuthorization();

//services.AddMvc().AddSessionStateTempDataProvider();
//services.AddSession();

//services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme,
//        options =>
//        {
//            options.LoginPath = new PathString("/Account/Login");
//        });

//services.ConfigureApplicationCookie(options =>
//{
//    options.Cookie.Name = "Cookie";
//    options.Cookie.HttpOnly = true;
//    options.LogoutPath = new PathString("/Account/LogOut");
//    options.ExpireTimeSpan = TimeSpan.FromDays(365);
//    options.LoginPath = new PathString("/Account/Login");
//    options.ReturnUrlParameter = CookieAuthenticationDefaults.ReturnUrlParameter;
//    options.SlidingExpiration = true;
//});
//services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//.AddCookie();

app.UseStatusCodePages(async context =>
{
	var response = context.HttpContext.Response;

	if (response.StatusCode == (int)HttpStatusCode.Unauthorized ||
			response.StatusCode == (int)HttpStatusCode.Forbidden)
		response.Redirect("/Account/Login");
});

//services.AddMvc()
//        .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Account/Login");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

//app.UseSession();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();
