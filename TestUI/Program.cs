

// See https://aka.ms/new-console-template for more information
using DataAccessLayer.Concrete.EntityFramework;
using EntityLayer;


//User user = new User { UserName = "Mehmet", UserMail = "deneme@gmail.com", UserPassword = "123456789", Name = "Deneme Kişisi", IsDeleted = 0 };
//UserDal userDal = new UserDal();
//IEnumerable<User> users = userDal.GetAll();

//userDal.Insert(user);

GuideBook guideBook = new GuideBook { FirstName = "Mehmet", LastName = "ERTAŞ", TelephoneNumber = "+905432708624", CreateUser = 1, ModifyDate = DateTime.Now, CreateDate = DateTime.Now, IsDeleted = 0, ModifyUser = 1 };
GuideDal guideDal = new GuideDal();
guideDal.Insert(guideBook);


Console.WriteLine("Son");
Console.ReadLine();