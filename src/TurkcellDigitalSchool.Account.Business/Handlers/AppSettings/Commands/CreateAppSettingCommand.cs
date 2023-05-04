using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateAppSettingCommand : CreateRequestBase<AppSetting>
    {
        public class CreateAppSettingCommandHandler : CreateRequestHandlerBase<AppSetting>
        {
            public CreateAppSettingCommandHandler(IAppSettingRepository appSettingRepository) : base(appSettingRepository)
            {
            }
        }
    }
}

