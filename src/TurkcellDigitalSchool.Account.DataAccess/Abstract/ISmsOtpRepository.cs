using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface ISmsOtpRepository : IEntityRepository<IEntityDefault>
    {
        public Task<int> ExecInsertSpForSms(string cellPhone, long userId, string otp);
        public Task<int> ExecUpdateSpForSms(string cellPhone, long userId, string otp);

    }
}