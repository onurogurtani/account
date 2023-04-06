using System.Linq.Expressions; 
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;
using TurkcellDigitalSchool.IdentityServerService.Services.Model;

namespace TurkcellDigitalSchool.IdentityServerService.Services
{
    public class CustomUserSvc : ICustomUserSvc
    {

        private readonly IUserRepository _userRepository;
        private readonly ILoginFailCounterRepository _loginFailCounterRepository;
        private readonly int CsrfTokenExpireHours = 6;
        public CustomUserSvc(IUserRepository userRepository, ILoginFailCounterRepository loginFailCounterRepository)
        {
            _userRepository = userRepository;
            _loginFailCounterRepository = loginFailCounterRepository;
        }
        public async Task<bool> Validate(string userName, string password)
        {
            var user = await FindByUserName(userName);
            var result = HashingHelper.VerifyPasswordHash(password, user.PassSalt, user.PassHash);
            return result;
        }

        public async Task<CustomUserDto> FindById(long id)
        {
            var user = await _userRepository.GetAsync(user1 => user1.Id == id);
            var result = GetCustomUser(user);
            return result;
        }

        public async Task<CustomUserDto> FindByUserName(string userName)
        {
            var isMailAdres = userName.IndexOf("@", StringComparison.Ordinal) > -1;

            Expression<Func<User, bool>> expression = null;

            if (isMailAdres)
            {
                expression = user1 => user1.Email == userName;
            }
            else
            {
                if (userName.Length == 11)
                {
                    long citizenId = 0;

                    var isPars = long.TryParse(userName, out citizenId);
                    if (isPars && citizenId != 0)
                    {
                        expression = user1 => user1.CitizenId == citizenId;
                    }
                }

                if (expression != null)
                {

                    expression = expression.Or(user1 => user1.UserName == userName);
                }
                else
                {
                    expression = user1 => user1.UserName == userName;
                }
            }

            var user = await _userRepository.GetAsync(expression);
            if (user==null)
            {
                return null;
            }
            var result = GetCustomUser(user);
            return result;
        }

        private CustomUserDto GetCustomUser(User user)
        {
            var result = new CustomUserDto
            {
                EMail = user.Email,
                Id = user.Id,
                Name = user.Name,
                UserName = user.UserName,
                PassHash = user.PasswordHash,
                PassSalt = user.PasswordSalt,
                Surname = user.SurName,
                TcNo = user.CitizenId == 0 ? "" : user.CitizenId + "",
                UserType = user.UserType,
                FailLoginCount = user.FailLoginCount
            };
            return result;
        }

        public async Task<List<OrganisationUsersDto>> GetUserOrganisation(long id)
        {
            var user = await _userRepository.Query().Include(i => i.OrganisationUsers).ThenInclude(i => i.Organisation)
                .Where(w => w.Id == id)
                .SelectMany(s => s.OrganisationUsers.Select(ss => new OrganisationUsersDto
                {
                    Id = ss.Organisation.Id,
                    Name = ss.Organisation.Name,
                })
                ).ToListAsync();
            return user;
        }

        public async Task ResetUserFailLoginCount(long id)
        {
            var user = await _userRepository.GetAsync(user => user.Id == id);
            user.FailLoginCount = 0;
            await _userRepository.UpdateAndSaveAsync(user);
        }

        public async Task<int> IncUserFailLoginCount(long id)
        {
            var user = await _userRepository.GetAsync(user => user.Id == id);
            user.FailLoginCount = (user.FailLoginCount ?? 0) + 1;
            await _userRepository.UpdateAndSaveAsync(user);
            return (user.FailLoginCount ?? 0);
        }


        public async Task ResetCsrfTokenFailLoginCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours * -1);
            var loginFailCounter = await _loginFailCounterRepository.GetAsync(x => x.CsrfToken == csrfToken && x.InsertTime > expTime);
            if (loginFailCounter != null)
            { 
             return;
            }
            loginFailCounter.FailCount=0;
            await _loginFailCounterRepository.UpdateAndSaveAsync(loginFailCounter);
        }

        public async Task<int> IncCsrfTokenFailLoginCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours*-1);
            var loginFailCounter = await _loginFailCounterRepository.GetAsync(x => x.CsrfToken  == csrfToken && x.InsertTime >= expTime);

            if (loginFailCounter != null)
            {
                loginFailCounter = new LoginFailCounter
                {
                    CsrfToken = csrfToken,
                    FailCount = 1
                };
                _loginFailCounterRepository.Add(loginFailCounter);
            }
            else
            {
                loginFailCounter.UpdateTime = DateTime.Now;
                loginFailCounter.FailCount = (loginFailCounter.FailCount ?? 0) + 1;
            } 
            await _loginFailCounterRepository.UpdateAndSaveAsync(loginFailCounter);
            return (loginFailCounter.FailCount ?? 0);
        }

        public async Task<int> GetCsrfTokenFailLoginCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours * -1);
            var loginFailCounter = await _loginFailCounterRepository.GetAsync(x => x.CsrfToken == csrfToken && x.InsertTime >= expTime);
            return (loginFailCounter?.FailCount ?? 0);
        }
    }
}
