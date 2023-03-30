using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries
{
    /// <summary>
    /// Get Names that using in contractKinds
    /// </summary>
    /// 
    [ExcludeFromCodeCoverage]
    public class GetContractKindNamesQuery : IRequest<IDataResult<List<string>>>
    {
        public class GetContractKindNamesQueryHandler : IRequestHandler<GetContractKindNamesQuery, IDataResult<List<string>>>
        {
            private readonly IContractKindRepository _contractKindRepository;

            public GetContractKindNamesQueryHandler(IContractKindRepository contractKindRepository)

            {
                _contractKindRepository = contractKindRepository;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<List<string>>> Handle(GetContractKindNamesQuery request, CancellationToken cancellationToken)
            {
                var contractKindNames = await _contractKindRepository.Query().Select(x => x.Name).ToListAsync();
                return new SuccessDataResult<List<string>>(contractKindNames);
            }
        }
    }

}
