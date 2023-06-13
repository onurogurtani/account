using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteAppSettingCommand : DeleteRequestBase<AppSetting>
    {
        public class DeleteRequestAppSettingCommandHandler : DeleteRequestHandlerBase<AppSetting, DeleteAppSettingCommand>
        {
            public DeleteRequestAppSettingCommandHandler(IAppSettingRepository repository) : base(repository)
            {
            }
        }
    }
}

