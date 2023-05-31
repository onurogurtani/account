using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class LdapUserInfoRepository : EfEntityRepositoryBase<LdapUserInfo, AccountDbContext>, ILdapUserInfoRepository
    {
        public LdapUserInfoRepository(AccountDbContext context) : base(context)
        {
        }
    }


}