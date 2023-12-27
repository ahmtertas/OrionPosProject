using DataAccessLayer.Abstract;
using EntityLayer;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccessLayer.Concrete.EntityFramework
{
	public class UserDal : IUserDal
	{


		public IEnumerable<User> GetAll(Expression<Func<User, bool>> filter = null)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				return filter == null ?
					context.Set<User>().ToList() :
					context.Set<User>().Where(filter).ToList();
			}
		}

		public User GetById(Expression<Func<User, bool>> filter)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				return context.Set<User>().SingleOrDefault(filter);
			}
		}


		public void Update(User entity)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				var updatedUser = context.Entry(entity);
				updatedUser.State = EntityState.Modified;
				context.SaveChanges();
			}
		}

		public void Insert(User entity)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				var addedUser = context.Entry(entity);
				addedUser.State = EntityState.Added;
				context.SaveChanges();
			}
		}

		public void Delete(User entity)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				var deletedUser = context.Entry(entity);
				deletedUser.State = EntityState.Deleted;
				context.SaveChanges();
			}
		}

		public User CheckUser(Expression<Func<User, bool>> filter)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				return context.Set<User>().SingleOrDefault(filter);
			}
		}


	}
}
