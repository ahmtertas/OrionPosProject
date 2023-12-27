using EntityLayer;
using System.Linq.Expressions;

namespace DataAccessLayer.Abstract
{
	public interface IUserDal : IEntityRepository<User>
	{
		User CheckUser(Expression<Func<User, bool>> filter);
	}
}
