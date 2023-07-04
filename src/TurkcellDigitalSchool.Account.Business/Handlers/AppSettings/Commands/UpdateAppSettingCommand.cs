using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.JopWorkControlEdit })]
    public class UpdateAppSettingCommand : UpdateRequestBase<AppSetting>
    {
        public class UpdateRequestAppSettingCommandRequestHandler : UpdateRequestDefinitionRequestHandlerBase<AppSetting, UpdateAppSettingCommand>
        {
            public UpdateRequestAppSettingCommandRequestHandler(IAppSettingRepository appSettingRepository) : base(appSettingRepository)
            {
            }
        }
    }
}

