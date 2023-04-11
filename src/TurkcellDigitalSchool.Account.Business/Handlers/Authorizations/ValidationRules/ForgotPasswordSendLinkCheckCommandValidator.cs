using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class ForgotPasswordSendLinkCheckCommandValidator : AbstractValidator<ForgotPasswordSendLinkCheckCommand>
    {
        public ForgotPasswordSendLinkCheckCommandValidator()
        {
            var appSetting = ServiceTool.ServiceProvider.GetService<IAppSettingRepository>();
            var appSettingEntity = appSetting.GetAsync(p => p.Code == "PassRule").Result;
            RuleFor(p => p.NewPass).Password(appSettingEntity);

            RuleFor(p => p.Guid).NotEmpty();
            RuleFor(p => p.NewPass).NotEmpty();
            RuleFor(p => p.NewPassAgain).NotEmpty();
            RuleFor(p => p.XId).NotEmpty();
        }
    }
}
