using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class ForgottenPasswordChangeValidator : AbstractValidator<ForgottenPasswordChangeCommand>
    {
        public ForgottenPasswordChangeValidator(IAppSettingRepository appSetting)
        {
            var appSettingEntity = appSetting.GetAsync(p => p.Code == "PassRule").Result;
            RuleFor(p => p.NewPassword).Password(appSettingEntity);
        }
    }
}
