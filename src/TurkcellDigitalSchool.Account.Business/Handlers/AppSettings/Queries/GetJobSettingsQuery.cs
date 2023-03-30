using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    public class GetJobSettingsQuery : IRequest<IDataResult<IEnumerable<AppSetting>>>
    {
        public class GetJobSettingsQueryHandler : IRequestHandler<GetJobSettingsQuery, IDataResult<IEnumerable<AppSetting>>>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public GetJobSettingsQueryHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }


            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<IEnumerable<AppSetting>>> Handle(GetJobSettingsQuery request, CancellationToken cancellationToken)
            {
                var jobs = Enum.GetValues(typeof(JobType)).Cast<JobType>().Select(v => v.ToString()).ToList();

                var appSettings = await _appSettingRepository.GetListAsync(p => jobs.Contains(p.Code));
               
                return new SuccessDataResult<IEnumerable<AppSetting>>(appSettings);
            }
        }
    }
}
