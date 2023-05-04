using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{ 
    public class GetAppSettingByCodeQuery : IRequest<IDataResult<AppSetting>>
    {
        public string Code { get; set; }
        public int CustomerId { get; set; }
        public int VouId { get; set; }

        public class GetAppSettingByCodeQueryHandler : IRequestHandler<GetAppSettingByCodeQuery, IDataResult<AppSetting>>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public GetAppSettingByCodeQueryHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }

            [SecuredOperation]
            public async Task<IDataResult<AppSetting>> Handle(GetAppSettingByCodeQuery request, CancellationToken cancellationToken)
            {
                var data = await _appSettingRepository.GetAppSettingValue(request.Code, request.CustomerId, request.VouId);

                return new SuccessDataResult<AppSetting>(data);
            }
        }
    }
}
