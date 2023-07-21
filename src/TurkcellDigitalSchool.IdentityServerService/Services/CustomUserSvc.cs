using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Exceptions;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;
using TurkcellDigitalSchool.IdentityServerService.Services.Model;

namespace TurkcellDigitalSchool.IdentityServerService.Services
{
    public class CustomUserSvc : ICustomUserSvc
    {

        private readonly IUserRepository _userRepository;
        private readonly IUserPackageRepository _userPackageRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        public CustomUserSvc(IUserRepository userRepository, IUserPackageRepository userPackageRepository, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _userPackageRepository = userPackageRepository;
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }
        public async Task<bool> Validate(string userName, string password)
        {
            var user = await FindByUserName(userName);
            if (user == null)
            {
                return false;
            }
            HashingHelper.CreatePasswordHash(password, out var passwordSalt, out var passwordHash);

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

            Expression<Func<User, bool>> expression = user1 => !user1.IsDeleted && user1.Status;

            if (isMailAdres)
            {
                expression = expression.And(user1 => user1.Email == userName);
            }
            else
            {
                long citizenId = 0;
                var isPars = long.TryParse(userName, out citizenId);
                if (userName.Length == 11 && isPars && citizenId != 0)
                {
                    expression = expression.And(user1 => user1.CitizenId == citizenId);
                }
                else
                {
                    expression = expression.And(user1 => user1.UserName == userName);
                }
            }

            var user = await _userRepository.GetAsync(expression);
            if (user == null)
            {
                return null;
            }
            var result = GetCustomUser(user);


            var origin = (_httpContextAccessor.HttpContext.Request.Headers.Origin.ToString() ?? "");
            var address = "";
            var indexNumber = origin.IndexOf("http");
            if (indexNumber > -1)
            {
                address = origin.Substring(indexNumber, origin.Length - indexNumber);
            }

            if (!string.IsNullOrEmpty(address))
            {
                var adminUIAdress = _configuration.GetSection("WebUIAddresses").GetSection("AdminPanel").Value;
                var userUIAdress = _configuration.GetSection("WebUIAddresses").GetSection("UserPanel").Value;

                if (  (result.UserType == UserType.Admin  ))
                {
                    if (adminUIAdress != address)
                    {
                        throw new RuleException("Adminlerin oturum açma izinleri bulunmamaktadır !");
                    }
                  
                }

                if ((result.UserType != UserType.Admin))
                {
                    if (userUIAdress != address)
                    {
                        throw new RuleException("Sadece adminler oturum açma izinleri bulunmaktatır !");
                    }   
                }
            }

            return result;
        }

        public CustomUserDto GetCustomUser(User user)
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
                FailOtpCount = user.FailOtpCount,
                EMailVerify = user.EmailVerify,
                MobilPhone = user.MobilePhones,
                MobilPhoneVerify = user.MobilePhonesVerify,
                LastPasswordDate = user.LastPasswordDate
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

        public async Task<bool> UserHasPackage(long id)
        {
            var user = await _userPackageRepository.Query().AnyAsync(w => w.UserId == id && w.IsDeleted);
            return user;
        }

        public async Task ResetUserOtpFailount(long userId)
        {
            await _userRepository.ResetFailLoginOtpCount(userId);
        }

        public async Task<string> GenerateUserOldPassChange(long userId)
        {
            var user = await _userRepository.GetAsync(w => w.Id == userId);


            if (!string.IsNullOrEmpty(user.LastPasswordChangeGuid) &&
                user.LastPasswordChangeExpTime != null && user.LastPasswordChangeExpTime.Value.ToUniversalTime() > DateTime.Now)
            {
                return user.LastPasswordChangeGuid;
            }

            user.LastPasswordChangeGuid = Guid.NewGuid().ToString();
            user.LastPasswordChangeExpTime = DateTime.Now.AddSeconds(OtpConst.NewPassOtpExpHour);
            await _userRepository.UpdateAndSaveAsync(user);
            return user.LastPasswordChangeGuid;
        }
    }
}
