using System.Collections.Generic;
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
    public class GetAppVersionInfoQuery : IRequest<DataResult<AppVersionInfoDto>>
    {
        public bool IsIOS { get; set; }
        public class GetAppVersionInfoQueryHandler : IRequestHandler<GetAppVersionInfoQuery, DataResult<AppVersionInfoDto>>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public GetAppVersionInfoQueryHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }
            public async Task<DataResult<AppVersionInfoDto>> Handle(GetAppVersionInfoQuery request, CancellationToken cancellationToken)
            {
                var appSettingCodes = request.IsIOS
                    ? new List<string>
                    {
                        AppSettingsEnum.IOSAppUrlCode, AppSettingsEnum.IOSVersionCode, AppSettingsEnum.IOSMinVersionCode
                    }
                    : new List<string>
                    {
                        AppSettingsEnum.AndroidAppUrlCode, AppSettingsEnum.AndroidVersionCode, AppSettingsEnum.AndroidMinVersionCode
                    }; 

                var appSettings = await _appSettingRepository.Query().Where(p => appSettingCodes.Contains(p.Code)).ToListAsync(cancellationToken: cancellationToken);
                 
                var result = new AppVersionInfoDto
                {
                    AppUrl = appSettings.FirstOrDefault(w => w.Code == appSettingCodes[0])?.Value ?? "",
                    MinVersion = appSettings.FirstOrDefault(w => w.Code == appSettingCodes[1])?.Value ?? "",
                    Version = appSettings.FirstOrDefault(w => w.Code == appSettingCodes[2])?.Value ?? ""
                }; 

                return  new DataResult<AppVersionInfoDto>(result,true);
            }
        }
    }
}
