using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetAppSettingQuery : QueryByIdRequestBase<AppSetting>
    {
        public class GetAppSettingQueryHandler : QueryByIdRequestHandlerBase<AppSetting>
        {
            public GetAppSettingQueryHandler(IAppSettingRepository appSettingRepository) : base(appSettingRepository)
            {
            }
        }
    }
}
