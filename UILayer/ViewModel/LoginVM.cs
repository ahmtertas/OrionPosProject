using System.ComponentModel.DataAnnotations;

namespace UILayer.ViewModel
{
	public class LoginVM
	{
		[Required(ErrorMessage = "Username is required.")]
		public string UserName { get; set; }
		[Required(ErrorMessage = "Password is required.")]
		[DataType(DataType.Password)]
		public string UserPassword { get; set; }
		[Display(Name = "Remember Me")]
		public bool RememberMe { get; set; }
	}
}
