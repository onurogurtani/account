using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
    [LogScope]
    public class GetPasswordRulesQuery : IRequest<IDataResult<List<GetPasswordRulesQueryResultDto>>>
    { 
        public class GetPasswordRulesQueryHandler : IRequestHandler<GetPasswordRulesQuery, IDataResult<List<GetPasswordRulesQueryResultDto>>>
        {
            private readonly IAppSettingRepository _appSettingRepository;
            private readonly IMediator _mediator;

            public GetPasswordRulesQueryHandler(IAppSettingRepository appSettingRepository, IMediator mediator)
            {
                _appSettingRepository = appSettingRepository;
                _mediator = mediator;
            } 
            public async Task<IDataResult<List<GetPasswordRulesQueryResultDto>>> Handle(GetPasswordRulesQuery request, CancellationToken cancellationToken)
            {
                var appSetting = await _appSettingRepository.GetAsync(p => p.Code == "PassRule");
                List<GetPasswordRulesQueryResultDto> list = RuleBuilderExtensions.GetPasswordRules(appSetting.Value);
                return new SuccessDataResult<List<GetPasswordRulesQueryResultDto>>(list);
            }
        }
    }
}
