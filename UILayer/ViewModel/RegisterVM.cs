using System.ComponentModel.DataAnnotations;

namespace UILayer.ViewModel
{
	public class RegisterVM
	{
		[Required]
		public string? Name { get; set; }
		[Required]
		[DataType(DataType.EmailAddress)]
		public string? Email { get; set; }
		public string? Password { get; set; }
		[Compare("Password", ErrorMessage = "Password don't Match.")]
		public string? ConfirmPassword { get; set; }
		public string? Address { get; set; }
	}
}
