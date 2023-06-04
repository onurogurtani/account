using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetAppSettingQuery : QueryByIdRequestBase<AppSetting>
    {
        public class GetAppSettingQueryHandler : QueryByIdBase<AppSetting, GetAppSettingQuery>
        {
            public GetAppSettingQueryHandler(IAppSettingRepository appSettingRepository) : base(appSettingRepository)
            {
            }
        }
    }
}
