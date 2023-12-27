using EntityLayer;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Concrete.EntityFramework
{
	public class OrionPosContext : DbContext
	{

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(
				@"Server=192.168.1.104,49170;Database=OrionPosDB;User Id=sa;Password=123456789;TrustServerCertificate=true;Encrypt=false;");
		}

		//Data Source=192.168.43.3,49170;Network Library=DBMSSOCN;Initial Catalog=OrionPosDB;User ID=sa;Password=123456789;
		public DbSet<User> User { get; set; }
		public DbSet<GuideBook> GuideBook { get; set; }
	}
}
