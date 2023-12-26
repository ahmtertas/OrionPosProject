using EntityLayer;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Concrete.EntityFramework
{
	public class OrionPosContext : DbContext
	{

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(
				@"Server=(localdb)\MSSQLLocalDB;Database=RentCar;Trusted_Connection=true");
		}

		public DbSet<User> Users { get; set; }
		public DbSet<GuideBook> GuideBooks { get; set; }
	}
}
