using System.Collections.Generic;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface ILdapUserInfoRepository : IEntityDefaultRepository<LdapUserInfo>
    {
        
    }
}