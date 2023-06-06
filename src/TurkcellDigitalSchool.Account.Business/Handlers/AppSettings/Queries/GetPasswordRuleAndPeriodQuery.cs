using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    [LogScope]
    public class GetPasswordRuleAndPeriodQuery : IRequest<DataResult<PasswordRuleAndPeriodDto>>
    {
        public class GetPasswordRuleAndPeriodQueryHandler : IRequestHandler<GetPasswordRuleAndPeriodQuery, DataResult<PasswordRuleAndPeriodDto>>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public GetPasswordRuleAndPeriodQueryHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }

            public async Task<DataResult<PasswordRuleAndPeriodDto>> Handle(GetPasswordRuleAndPeriodQuery request, CancellationToken cancellationToken)
            {
                var passwordRuleAndPeriodDto = new PasswordRuleAndPeriodDto();

                var getPasswordRule = await _appSettingRepository.Query().Where(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.Code == AppSettingsEnum.PasswordRuleValueCode).FirstOrDefaultAsync(cancellationToken);
                if (getPasswordRule != null)
                {
                    passwordRuleAndPeriodDto.HasNumber = getPasswordRule.Value.Contains(@"[0-");
                    passwordRuleAndPeriodDto.HasUpperChar = getPasswordRule.Value.Contains(@"[A-");
                    passwordRuleAndPeriodDto.HasLowerChar = getPasswordRule.Value.Contains(@"[a-");
                    passwordRuleAndPeriodDto.HasSymbol = getPasswordRule.Value.Contains(@"([!");

                    if (getPasswordRule.Value.Contains(".{"))
                    {
                        var minMaxCharArray = getPasswordRule.Value.Substring(0, 12).Replace("(?=^.{", "").Replace("}$", "").Replace("(", "").Replace(")", "").Split(",");
                        if (minMaxCharArray.Length > 0)
                        {
                            passwordRuleAndPeriodDto.MinCharacter = minMaxCharArray[0] != null ? Convert.ToInt32(minMaxCharArray[0]) : null;
                            passwordRuleAndPeriodDto.MaxCharacter = minMaxCharArray[1] != null ? Convert.ToInt32(minMaxCharArray[1]) : null;
                        }
                    }
                }

                var getPasswordPeriod = await _appSettingRepository.Query().Where(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.Code == AppSettingsEnum.PasswordPeriodDefaultValueCode).FirstOrDefaultAsync(cancellationToken);
                if (getPasswordPeriod != null)
                {
                    passwordRuleAndPeriodDto.PasswordPeriod = getPasswordPeriod.Value != "0" ? Convert.ToInt32(getPasswordPeriod.Value) : null;
                }

                if (getPasswordRule == null && getPasswordPeriod == null)
                {
                    return new ErrorDataResult<PasswordRuleAndPeriodDto>(data: null, "Şifre kuralı ve Periyod bilgisi bulunamadı.");

                }
                return new SuccessDataResult<PasswordRuleAndPeriodDto>(data: passwordRuleAndPeriodDto);

            }
        }
    }
}
