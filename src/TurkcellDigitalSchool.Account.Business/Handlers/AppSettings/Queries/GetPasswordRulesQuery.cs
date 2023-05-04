using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using RuleBuilderExtensions = TurkcellDigitalSchool.Account.Business.Helpers.RuleBuilderExtensions;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries
{
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


            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<List<GetPasswordRulesQueryResultDto>>> Handle(GetPasswordRulesQuery request, CancellationToken cancellationToken)
            {
                var appSetting = await _appSettingRepository.GetAsync(p => p.Code == "PassRule");
                List<GetPasswordRulesQueryResultDto> list = RuleBuilderExtensions.GetPasswordRules(appSetting.Value);
                return new SuccessDataResult<List<GetPasswordRulesQueryResultDto>>(list);
            }
        }
    }
}
