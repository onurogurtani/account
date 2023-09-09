using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PublicOneTimePasswordRepository : EfEntityRepositoryBase<PublicOneTimePassword, AccountDbContext>, IPublicOneTimePasswordRepository
    {
        public PublicOneTimePasswordRepository(AccountDbContext context)
            : base(context)
        {
        }
    }
}
