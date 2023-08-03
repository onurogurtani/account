using System.Collections.Generic;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUserRepository : IEntityDefaultRepository<User>
    {
        public bool IsExistForExternalLogin(UserAddingType userAddingType, string relatedIdentity);

        public User AddOrUpdateForExternalLogin(UserAddingType userAddingType, string relatedIdentity, string oauthAccessToken, string oauthOpenIdConnectToken, string name, string surname, string email, string phone);

        List<OperationClaim> GetClaims(long userId);  

        public Task ResetFailLoginOtpCount(long userId);

        public Task<int> IncFailLoginOtpCount(long userId);

        public Task<int> GetFailLoginOtpCount(long userId);

        public Task<bool> IsPackageBuyer(long userId);
    }
}