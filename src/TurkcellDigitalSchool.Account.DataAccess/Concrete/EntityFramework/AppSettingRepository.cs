using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Utilities.IoC; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class AppSettingRepository : EfEntityRepositoryBase<AppSetting, AccountDbContext>, IAppSettingRepository
    {
        public AppSettingRepository(AccountDbContext context) : base(context)
        {
        }

        public async Task<AppSetting> GetAppSetting(string code, int customerId, int vouId)
        {
            var appSettings = await GetListAsync(w => w.Code == code && w.CustomerId == customerId);

            if (!appSettings.Any())
            {
                appSettings = await GetListAsync(w => w.Code == code && w.CustomerId == null);
            }

            if (appSettings.Any(w => w.VouId == vouId))
            {
                appSettings = appSettings.Where(w => w.VouId == vouId);
            }
            else
            {
                appSettings = appSettings.Where(w => w.VouId == null);
            }

            var languageCode = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>().HttpContext.Request.Headers.ContentLanguage.ToString();

            if (appSettings.Any() && appSettings.Count() > 1 && languageCode != String.Empty)
            {
                appSettings = from a in appSettings
                              where a.LanguageId == (languageCode == "tr" ? 1 : 2)
                              select a;
            }

            return appSettings.FirstOrDefault();
        }

        public async Task<string> GetAppSettingValue(string code, int customerId)
        {
            var appSetting = await GetAppSetting(code, customerId , 0);
            if(appSetting != null)
            {
                return appSetting.Value;
            }
            return String.Empty;
        }

        public async Task<string> GetAppSettingValue(string code, int customerId, int vouId)
        {
            var appSetting = await GetAppSetting(code, customerId, vouId);
            if (appSetting != null)
            {
                return appSetting.Value;
            }
            return String.Empty;
        }

    }
}
