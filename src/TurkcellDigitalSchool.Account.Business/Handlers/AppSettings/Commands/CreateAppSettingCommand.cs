using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateAppSettingCommand : CreateRequestBase<AppSetting>
    {
        public class CreateRequestAppSettingCommandHandler : CreateRequestHandlerBase<AppSetting, CreateAppSettingCommand>
        {
            public CreateRequestAppSettingCommandHandler(IAppSettingRepository appSettingRepository) : base(appSettingRepository)
            {
            }
        }
    }
}

