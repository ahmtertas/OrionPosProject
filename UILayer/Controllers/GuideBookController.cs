using BusinessLayer.Abstract;
using BusinessLayer.Concrete;
using DataAccessLayer.Concrete.EntityFramework;
using EntityLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UILayer.Controllers
{
	[Authorize]
	public class GuideBookController : Controller
	{
		private readonly ILogger<GuideBookController> _logger;

		public GuideBookController(ILogger<GuideBookController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}


		[HttpGet]
		public JsonResult GetGuideList()
		{
			try
			{
				IGuideService guideService = new GuideManager(new GuideDal());
				return Json(guideService.GetAll());
			}
			catch (Exception ex) { }
			return Json(null);
		}

		[HttpPost]
		public JsonResult RemoveGuide(string id)
		{
			try
			{
				IGuideService guideService = new GuideManager(new GuideDal());
				return Json(guideService.Update(id));
			}
			catch (Exception ex)
			{
			}
			return Json(null);
		}

		[HttpGet]
		public JsonResult GetUpdateGuide(string id)
		{
			try
			{
				int item_id = int.Parse(id);
				IGuideService guideService = new GuideManager(new GuideDal());
				return Json(guideService.GetById(item_id));
			}
			catch (Exception ex)
			{
			}
			return Json(null);
		}


		[HttpPost]
		public JsonResult UpdateGuide(GuideBook guideBook)
		{
			try
			{
				IGuideService guideService = new GuideManager(new GuideDal());

				GuideBook guideBookNew = new GuideBook();
				guideBookNew = guideService.GetById(guideBook.Id).Data;

				guideBookNew.TelephoneNumber = guideBook.TelephoneNumber;
				guideBookNew.FirstName = guideBook.FirstName;
				guideBookNew.LastName = guideBook.LastName;
				guideBookNew.ModifyDate = DateTime.Now;
				guideBookNew.ModifyUser = 1;

				return Json(guideService.Update(guideBookNew));
			}
			catch (Exception ex)
			{
			}
			return Json(null);
		}

		[HttpPost]
		public JsonResult InsertGuide(GuideBook guideBook)
		{
			try
			{
				guideBook.ModifyDate = DateTime.Now;
				guideBook.CreateDate = DateTime.Now;
				guideBook.ModifyUser = 1;
				guideBook.CreateUser = 1;
				guideBook.IsDeleted = 0;

				IGuideService guideService = new GuideManager(new GuideDal());

				return Json(guideService.Insert(guideBook));
			}
			catch (Exception ex)
			{
			}
			return Json(null);
		}


	}
}
