using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateAppSettingCommand : UpdateRequestBase<AppSetting>
    {
        public class UpdateAppSettingCommandHandler : UpdateDefinitionHandlerBase<AppSetting, UpdateAppSettingCommand>
        {
            public UpdateAppSettingCommandHandler(IAppSettingRepository appSettingRepository) : base(appSettingRepository)
            {
            }
        }
    }
}

