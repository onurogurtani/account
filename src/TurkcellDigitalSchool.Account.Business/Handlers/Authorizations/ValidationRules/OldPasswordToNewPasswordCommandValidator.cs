using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class OldPasswordToNewPasswordCommandValidator : AbstractValidator<OldPasswordToNewPasswordCommand>
    {
        public OldPasswordToNewPasswordCommandValidator(IAppSettingRepository appSetting)
        {
            var appSettingEntity = appSetting.GetAsync(p => p.Code == "PassRule").Result;
            RuleFor(p => p.NewPass).Password(appSettingEntity);
            RuleFor(p => p.Guid).NotEmpty();
            RuleFor(p => p.XId).NotEmpty(); 
        }
    }
}
