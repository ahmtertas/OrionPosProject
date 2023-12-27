using DataAccessLayer.Abstract;
using EntityLayer;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccessLayer.Concrete.EntityFramework
{
	public class GuideDal : IGuideDal
	{
		public IEnumerable<GuideBook> GetAll(Expression<Func<GuideBook, bool>> filter = null)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				return filter == null ?
					context.Set<GuideBook>().ToList() :
					context.Set<GuideBook>().Where(filter).ToList();
			}
		}

		public GuideBook GetById(Expression<Func<GuideBook, bool>> filter)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				return context.Set<GuideBook>().SingleOrDefault(filter);
			}
		}


		public void Update(GuideBook entity)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				var updatedBrand = context.Entry(entity);
				updatedBrand.State = EntityState.Modified;
				context.SaveChanges();
			}
		}

		public void Insert(GuideBook entity)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				var addedBrand = context.Entry(entity);
				addedBrand.State = EntityState.Added;
				context.SaveChanges();
			}
		}

		public void Delete(GuideBook entity)
		{
			using (OrionPosContext context = new OrionPosContext())
			{
				var deletedBrand = context.Entry(entity);
				deletedBrand.State = EntityState.Deleted;
				context.SaveChanges();
			}
		}

	}
}
