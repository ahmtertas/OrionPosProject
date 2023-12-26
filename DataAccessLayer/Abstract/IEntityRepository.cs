using System.Linq.Expressions;

namespace DataAccessLayer.Abstract
{
	public interface IEntityRepository<TEntity> where TEntity : class
	{
		IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null);
		TEntity GetById(Expression<Func<TEntity, bool>> filter);
		void Delete(int id);
		void Update(TEntity entity);
		void Insert(TEntity entity);
	}
}
