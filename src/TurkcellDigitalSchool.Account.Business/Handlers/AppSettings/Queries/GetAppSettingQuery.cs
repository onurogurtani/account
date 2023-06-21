using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetAppSettingQuery : QueryByIdRequestBase<AppSetting>
    {
        public class GetAppSettingQueryHandler : QueryByIdRequestHandlerBase<AppSetting, GetAppSettingQuery>
        {
            public GetAppSettingQueryHandler(IAppSettingRepository appSettingRepository) : base(appSettingRepository)
            {
            }
        }
    }
}
