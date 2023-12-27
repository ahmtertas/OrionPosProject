using BusinessLayer.Abstract;
using Core;
using DataAccessLayer.Abstract;
using EntityLayer;

namespace BusinessLayer.Concrete
{
    public class UserManager : IUserService
    {
        IUserDal _userDal;
        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }

        Result<User> IUserService.CheckUser(string UserName, string UserPassword)
        {
            User user = _userDal.CheckUser(p => (p.UserMail == UserName || p.UserName == UserName) && (p.UserPassword == UserPassword));

            if (user == null)
            {
                return new Result<User>("Kullanıcı Kodu ya da Şifre Hatalı!", new User { Id = 0 });
            }
            else
            {
                return new Result<User>(new User
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    UserPassword = user.UserPassword,
                    UserMail = user.UserMail,
                    Name = user.Name,
                    IsDeleted = user.IsDeleted
                });
            }

        }

        Result<bool> IUserService.Delete(User guide)
        {
            _userDal.Delete(guide);
            return new Result<bool>(ConstantMessage.DeleteProcess, true);
        }

        Result<IEnumerable<User>> IUserService.GetAll()
        {
            IEnumerable<User> users = _userDal.GetAll();
            return new Result<IEnumerable<User>>(ConstantMessage.GetListProcess, users);
        }

        Result<User> IUserService.GetById(int id)
        {
            User user = _userDal.GetById(p => p.Id == id);
            return new Result<User>(new User
            {
                Id = user.Id,
                IsDeleted = user.IsDeleted,
                Name = user.Name,
                UserMail = user.UserMail,
                UserName = user.UserName,
                UserPassword = user.UserPassword
            });
        }

        Result<bool> IUserService.Insert(User guide)
        {
            _userDal.Insert(guide);
            return new Result<bool>(ConstantMessage.InsertProcess, true);

        }

        Result<bool> IUserService.Update(User guide)
        {
            _userDal.Update(guide);
            return new Result<bool>(ConstantMessage.UpdateProcess, true);
        }
    }
}
