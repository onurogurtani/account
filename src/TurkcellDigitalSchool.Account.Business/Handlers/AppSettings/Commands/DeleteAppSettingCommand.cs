using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteAppSettingCommand : DeleteRequestBase<AppSetting>
    {
        public class DeleteAppSettingCommandHandler : DeleteHandlerBase<AppSetting, DeleteAppSettingCommand>
        {
            public DeleteAppSettingCommandHandler(IAppSettingRepository repository) : base(repository)
            {
            }
        }
    }
}

