using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    [LogScope]
    [SecuredOperation]
    public class GetAppSettingByCodeQuery : IRequest<DataResult<AppSetting>>
    {
        public string Code { get; set; }
        public int CustomerId { get; set; }
        public int VouId { get; set; }

        public class GetAppSettingByCodeQueryHandler : IRequestHandler<GetAppSettingByCodeQuery, DataResult<AppSetting>>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public GetAppSettingByCodeQueryHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }

            public async Task<DataResult<AppSetting>> Handle(GetAppSettingByCodeQuery request, CancellationToken cancellationToken)
            {
                var data = await _appSettingRepository.GetAppSettingValue(request.Code, request.CustomerId, request.VouId);

                return new SuccessDataResult<AppSetting>(data);
            }
        }
    }
}
