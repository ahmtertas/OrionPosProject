using EntityLayer;

namespace BusinessLayer.Abstract
{
	public interface IGuideService
	{
		Result<IEnumerable<GuideBook>> GetAll();
		Result<GuideBook> GetById(int id);
		Result<bool> Delete(GuideBook guide);
		Result<bool> Update(string id);
		Result<bool> Update(GuideBook guide);
		Result<bool> Insert(GuideBook guide);
	}
}
