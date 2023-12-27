using EntityLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UILayer.Models;
using UILayer.ViewModel;

namespace UILayer.Controllers
{
	[AllowAnonymous]
	public class AccountController : Controller
	{
		private readonly SignInManager<AppUser> signInManager;
		private readonly UserManager<AppUser> userManager;
		private readonly ILogger<AccountController> _logger;
		private string CookieKey { get; set; }

		public AccountController(ILogger<AccountController> logger, SignInManager<AppUser> signInManager, UserManager<AppUser> userManager)
		{
			_logger = logger;
			this.signInManager = signInManager;
			this.userManager = userManager;
		}

		public IActionResult Login()
		{
			if (HttpContext.User.Identity.IsAuthenticated)
			{
				return RedirectToAction("Index", "GuideBook");
			}
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> Login(LoginVM user1)
		{

			//RegisterVM model = new RegisterVM();
			//model.Password = "Abc!12345";
			//model.Name = "Ahmet ERTAÞ";
			//model.Email = "rtsahmet26@gmail.com";
			//model.Address = "Eskiþehir/TURKEY";

			//AppUser user = new AppUser()
			//{
			//	//Name = model.Name,
			//	UserName = model.Email,
			//	Email = model.Email
			//	//Address = model.Address
			//};

			//var result0 = await userManager.CreateAsync(user, model.Password!);

			var result = await signInManager.PasswordSignInAsync(user1.UserName, user1.UserPassword, user1.RememberMe, false);
			if (result.Succeeded)
			{
				return Json(new Result<bool>(true));
			}

			return Json(new Result<bool>("Kullanýcý Adý veya Þifre Hatalý", false));
		}

		[HttpPost]
		public async Task<IActionResult> Register()
		{
			RegisterVM model = new RegisterVM();
			model.Password = "123456789";
			model.Name = "Ahmet ERTAÞ";
			model.Email = "rtsahmet26@gmail.com";
			model.Address = "Eskiþehir/TURKEY";

			AppUser user = new AppUser()
			{
				UserName = model.Email,
				Email = model.Email,
			};

			var result = await userManager.CreateAsync(user, model.Password);
			if (result.Succeeded)
			{
				return Json(new Result<bool>(true));
			}
			else
			{
				return Json(new Result<bool>("Ýþlem Baþarýsýz", false));
			}

		}

		[Authorize]
		public async Task<IActionResult> LogOut()
		{
			await signInManager.SignOutAsync();

			return Json(new Result<bool>(true));
		}

	}
}
