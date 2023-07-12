using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class AppSettingsInitWithDefaultValueCommand : IRequest<IResult>
    { 
        public class AppSettingsInitWithDefaultValueCommandHandler : IRequestHandler<AppSettingsInitWithDefaultValueCommand, IResult>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public AppSettingsInitWithDefaultValueCommandHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }

            public async Task<IResult> Handle(AppSettingsInitWithDefaultValueCommand request, CancellationToken cancellationToken)
            {

                await AddAppSettingDefault(AppSettingsEnum.PasswordRuleDefaultValue, AppSettingsEnum.PasswordRuleValueName, AppSettingsEnum.PasswordRuleValueCode);
                
                await AddAppSettingDefault(AppSettingsEnum.PasswordPeriodDefaultValue, AppSettingsEnum.PasswordPeriodDefaultValueName, AppSettingsEnum.PasswordPeriodDefaultValueCode);
               
                await AddAppSettingDefault(AppSettingsEnum.DeleteDraftWorkPlanDefaultValue, AppSettingsEnum.DeleteDraftWorkPlanName, AppSettingsEnum.DeleteDraftWorkPlanCode);

                await AddAppSettingDefault(AppSettingsEnum.AndroidAppUrlDefaultValue, AppSettingsEnum.AndroidAppUrlName, AppSettingsEnum.AndroidAppUrlCode);
                await AddAppSettingDefault(AppSettingsEnum.IOSAppUrlDefaultValue, AppSettingsEnum.IOSAppUrlName, AppSettingsEnum.IOSAppUrlCode);

                await AddAppSettingDefault(AppSettingsEnum.AndroidVersionDefaultValue, AppSettingsEnum.AndroidVersionName, AppSettingsEnum.AndroidVersionCode);
                await AddAppSettingDefault(AppSettingsEnum.IOSVersionDefaultValue, AppSettingsEnum.IOSVersionName, AppSettingsEnum.IOSVersionCode);

                await AddAppSettingDefault(AppSettingsEnum.AndroidMinVersionDefaultValue, AppSettingsEnum.AndroidMinVersionName, AppSettingsEnum.AndroidMinVersionCode);
                await AddAppSettingDefault(AppSettingsEnum.IOSMinVersionDefaultValue, AppSettingsEnum.IOSMinVersionName, AppSettingsEnum.IOSMinVersionCode);

                await _appSettingRepository.SaveChangesAsync(); 
                return new SuccessResult(Messages.SuccessfulOperation);
            }

            private async Task AddAppSettingDefault(string value, string name, string code)
            {
                if (await _appSettingRepository.Query().AnyAsync(a=>a.Code== code))
                {
                    return;
                }
                var record =  new AppSetting
                {
                    IsDeleted = false,
                    RecordStatus = RecordStatus.Active,
                    Code = code,
                    Name = name,
                    Value = value
                }; 
                _appSettingRepository.Add(record);
            }
        }
    }
}
