using System.Linq.Expressions; 
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing; 
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;
using TurkcellDigitalSchool.IdentityServerService.Services.Model;

namespace TurkcellDigitalSchool.IdentityServerService.Services
{
    public class CustomUserSvc : ICustomUserSvc
    {

        private readonly IUserRepository _userRepository; 

        public CustomUserSvc(IUserRepository userRepository )
        {
            _userRepository = userRepository; 
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
                FailLoginCount = user.FailLoginCount,
                EMailVerify = user.EmailVerify,
                MobilPhone = user.MobilePhones,
                MobilPhoneVerify = user.MobilePhonesVerify
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
 
    }
}
