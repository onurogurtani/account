using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class SmsOtpRepository : EfEntityRepositoryBase<IEntityDefault, ProjectDbContext>, ISmsOtpRepository
    {
        public SmsOtpRepository(ProjectDbContext context)
            : base(context)
        {
        }

        public Task<int> ExecInsertSpForSms(string cellPhone, long userId, string otp)
        {
            return Task<int>.FromResult<int>(1);
        }

        public Task<int> ExecUpdateSpForSms(string cellPhone, long userId, string otp)
        {
            return Task<int>.FromResult<int>(1);
        }
    }
}
