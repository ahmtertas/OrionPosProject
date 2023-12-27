namespace EntityLayer
{
	public class GuideBook : BaseEntity
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string TelephoneNumber { get; set; }
		public DateTime? CreateDate { get; set; }
		public int? CreateUser { get; set; }
		public DateTime? ModifyDate { get; set; }
		public int? ModifyUser { get; set; }

	}
}
