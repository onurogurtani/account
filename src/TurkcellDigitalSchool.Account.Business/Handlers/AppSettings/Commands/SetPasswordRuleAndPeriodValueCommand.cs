using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{

    public class SetPasswordRuleAndPeriodValueCommand : IRequest<IResult>
    {
        public int MinCharacter { get; set; }
        public int MaxCharacter { get; set; }
        public bool HasUpperChar { get; set; }
        public bool HasLowerChar { get; set; }
        public bool HasNumber { get; set; }
        public bool HasSymbol { get; set; }
        public int? PasswordPeriod { get; set; }
        public class SetPasswordRuleAndPeriodValueCommandHandler : IRequestHandler<SetPasswordRuleAndPeriodValueCommand, IResult>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public SetPasswordRuleAndPeriodValueCommandHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }
             
            public async Task<IResult> Handle(SetPasswordRuleAndPeriodValueCommand request, CancellationToken cancellationToken)
            {

                //TODO regex patternleri appsetting'e taşınabilir.
                var existAppSettingsPasswordRuleCode = await _appSettingRepository.Query().Where(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.Code == AppSettingsEnum.PasswordRuleValueCode).FirstOrDefaultAsync(cancellationToken);

                var generatedRegex = string.Empty;

                if (request.MinCharacter != 0 && request.MaxCharacter != 0)//minMaxcharacter
                {
                    generatedRegex = generatedRegex + new Regex(@"(?=^.{minChar,maxChar}$)");
                    generatedRegex = generatedRegex.Replace("minChar", request.MinCharacter.ToString());
                    generatedRegex = generatedRegex.Replace("maxChar", request.MaxCharacter.ToString());
                }

                if (request.HasNumber)
                {
                    generatedRegex = generatedRegex + new Regex(@"(?=.*[0-9])");//Number 
                }

                if (request.HasUpperChar)
                {
                    generatedRegex = generatedRegex + new Regex(@"(?=.*[A-ZĞÜŞİÖÇ])");//UpperCharacter
                }

                if (request.HasLowerChar)
                {
                    generatedRegex = generatedRegex + new Regex(@"(?=.*[a-zğüşıöç])");//LowerCharacter
                }

                if (request.HasSymbol)
                {
                    generatedRegex = generatedRegex + new Regex(@"(?=.*[!@#$%^&*()_+=\[{\]};:<>|.?,-])");//Symbols  
                }



                if (existAppSettingsPasswordRuleCode == null)
                {
                    var newRecord = new AppSetting
                    {
                        Value = generatedRegex,
                        RecordStatus = RecordStatus.Active,
                        Name = AppSettingsEnum.PasswordRuleValueName,
                        Code = AppSettingsEnum.PasswordRuleValueCode
                    };
                    await _appSettingRepository.CreateAndSaveAsync(newRecord);
                }
                else
                {
                    existAppSettingsPasswordRuleCode.Value = generatedRegex;
                    await _appSettingRepository.UpdateAndSaveAsync(existAppSettingsPasswordRuleCode);
                }


                var existAppSettingsPasswordPeriodCode = _appSettingRepository.Query().Where(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.Code == AppSettingsEnum.PasswordPeriodDefaultValueCode).FirstOrDefault();
                if (existAppSettingsPasswordPeriodCode == null)
                {
                    var newRecord = new AppSetting
                    {
                        Value = request.PasswordPeriod == null ? "0" : request.PasswordPeriod.ToString(),
                        RecordStatus = RecordStatus.Active,
                        Name = AppSettingsEnum.PasswordPeriodDefaultValueName,
                        Code = AppSettingsEnum.PasswordPeriodDefaultValueCode
                    };
                    await _appSettingRepository.CreateAndSaveAsync(newRecord);
                }
                else if (existAppSettingsPasswordPeriodCode != null)
                {
                    existAppSettingsPasswordPeriodCode.Value = request.PasswordPeriod == null ? "0" : request.PasswordPeriod.ToString();
                    await _appSettingRepository.UpdateAndSaveAsync(existAppSettingsPasswordRuleCode);
                }


                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }


    }
}
