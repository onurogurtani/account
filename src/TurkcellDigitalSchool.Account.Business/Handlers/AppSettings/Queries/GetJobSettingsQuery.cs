using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{

    [LogScope]
    public class GetJobSettingsQuery : IRequest<IDataResult<IEnumerable<AppSetting>>>
    {
        public class GetJobSettingsQueryHandler : IRequestHandler<GetJobSettingsQuery, IDataResult<IEnumerable<AppSetting>>>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public GetJobSettingsQueryHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }
             
            public async Task<IDataResult<IEnumerable<AppSetting>>> Handle(GetJobSettingsQuery request, CancellationToken cancellationToken)
            {
                var jobs = Enum.GetValues(typeof(JobType)).Cast<JobType>().Select(v => v.ToString()).ToList();

                var appSettings = await _appSettingRepository.GetListAsync(p => jobs.Contains(p.Code));
               
                return new SuccessDataResult<IEnumerable<AppSetting>>(appSettings);
            }
        }
    }
}
