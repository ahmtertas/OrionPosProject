using BusinessLayer.Abstract;
using Core;
using DataAccessLayer.Abstract;
using EntityLayer;

namespace BusinessLayer.Concrete
{
	public class GuideManager : IGuideService
	{
		IGuideDal _guideDal;
		public GuideManager(IGuideDal guideDal)
		{
			_guideDal = guideDal;
		}

		public Result<bool> Update(GuideBook guide)
		{
			_guideDal.Update(guide);
			return new Result<bool>(ConstantMessage.UpdateProcess, false);
		}

		Result<bool> IGuideService.Delete(GuideBook guide)
		{
			_guideDal.Update(guide);
			return new Result<bool>(ConstantMessage.DeleteProcess, false);
		}

		Result<IEnumerable<GuideBook>> IGuideService.GetAll()
		{
			IEnumerable<GuideBook> guideBooks = _guideDal.GetAll(p => p.IsDeleted == 0);
			return new Result<IEnumerable<GuideBook>>(guideBooks);
		}

		Result<GuideBook> IGuideService.GetById(int id)
		{
			GuideBook guideBook = _guideDal.GetById(p => p.Id == id);
			return new Result<GuideBook>(guideBook);
		}

		Result<bool> IGuideService.Insert(GuideBook guide)
		{
			_guideDal.Insert(guide);
			return new Result<bool>(ConstantMessage.InsertProcess, false);
		}

		Result<bool> IGuideService.Update(string id)
		{
			int item_id = Convert.ToInt32(id);
			GuideBook guideBook = _guideDal.GetById(p => p.Id == item_id);
			guideBook.IsDeleted = 1;
			_guideDal.Update(guideBook);
			return new Result<bool>(ConstantMessage.UpdateProcess, false);
		}
	}
}
