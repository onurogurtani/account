using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class SmsOtpRepository : EfEntityRepositoryBase<IEntityDefault, AccountDbContext>, ISmsOtpRepository
    {
        public SmsOtpRepository(AccountDbContext context)
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
