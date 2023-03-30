using System.Collections.Generic;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUserRepository : IEntityDefaultRepository<User>
    {
        public bool IsExistForExternalLogin(UserAddingType userAddingType, string relatedIdentity);

        public User AddOrUpdateForExternalLogin(UserAddingType userAddingType, string relatedIdentity, string oauthAccessToken, string oauthOpenIdConnectToken, string name, string surname, string email, string phone);

        List<OperationClaim> GetClaims(long userId);
    }
}