using EntityLayer;

namespace BusinessLayer.Abstract
{
	public interface IUserService
	{
		Result<IEnumerable<User>> GetAll();
		Result<User> GetById(int id);
		Result<bool> Delete(User guide);
		Result<bool> Update(User guide);
		Result<bool> Insert(User guide);
		Result<User> CheckUser(string UserName, string UserPassword);
	}
}
