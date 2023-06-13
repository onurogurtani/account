using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetAppSettingsQuery : QueryByFilterRequestBase<AppSetting>
    {
        public class GetAppSettingsQueryHandler : QueryByFilterRequestHandlerBase<AppSetting, GetAppSettingsQuery>
        {
            public GetAppSettingsQueryHandler(IAppSettingRepository repository) : base(repository)
            {
            }
        }
    }
}