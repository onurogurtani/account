using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IAppSettingRepository : IEntityDefaultRepository<AppSetting>
    {

        Task<AppSetting> GetAppSetting(string code, int customerId, int vouId);

        Task<string> GetAppSettingValue(string code, int customerId);
        Task<string> GetAppSettingValue(string code, int customerId, int vouId);
    }
}