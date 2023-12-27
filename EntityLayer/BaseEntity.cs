namespace EntityLayer
{
	public class BaseEntity : IEntity
	{
		public int Id { get; set; }
		public int IsDeleted { get; set; }

	}
}
