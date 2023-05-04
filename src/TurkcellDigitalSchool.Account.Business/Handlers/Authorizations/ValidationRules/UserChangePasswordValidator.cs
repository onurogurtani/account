using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class UserChangePasswordValidator : AbstractValidator<UserChangePasswordCommand>
    {
        public UserChangePasswordValidator(IAppSettingRepository appSetting)
        {
            var appSettingEntity = appSetting.GetAsync(p => p.Code == "PassRule").Result;
            RuleFor(p => p.NewPassword).Password(appSettingEntity);
        }
    }
}
