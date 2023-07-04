using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries
{
    /// <summary>
    /// Get Names that using in contractKinds
    /// </summary>
    /// 
    [ExcludeFromCodeCoverage]
    [LogScope] 
    public class GetContractKindNamesQuery : IRequest<DataResult<List<string>>>
    {
        public class GetContractKindNamesQueryHandler : IRequestHandler<GetContractKindNamesQuery, DataResult<List<string>>>
        {
            private readonly IContractKindRepository _contractKindRepository;

            public GetContractKindNamesQueryHandler(IContractKindRepository contractKindRepository)

            {
                _contractKindRepository = contractKindRepository;
            }

            [CacheRemoveAspect("Get")]
            public async Task<DataResult<List<string>>> Handle(GetContractKindNamesQuery request, CancellationToken cancellationToken)
            {
                var contractKindNames = await _contractKindRepository.Query().Select(x => x.Name).ToListAsync();
                return new SuccessDataResult<List<string>>(contractKindNames);
            }
        }
    }

}
