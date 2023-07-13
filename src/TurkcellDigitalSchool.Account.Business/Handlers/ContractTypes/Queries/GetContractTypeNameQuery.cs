using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Queries
{
    /// <summary>
    /// Get Names that using in contractTypes
    /// </summary>
    [ExcludeFromCodeCoverage]
    [LogScope] 
    public class GetContractTypeNamesQuery : IRequest<DataResult<List<string>>>
    {
        public class GetContractTypeNamesQueryHandler : IRequestHandler<GetContractTypeNamesQuery, DataResult<List<string>>>
        {
            private readonly IContractTypeRepository _contractTypeRepository;

            public GetContractTypeNamesQueryHandler(IContractTypeRepository contractTypeRepository)

            {
                _contractTypeRepository = contractTypeRepository;
            }

             
            public async Task<DataResult<List<string>>> Handle(GetContractTypeNamesQuery request, CancellationToken cancellationToken)
            {
                var contractTypeNames = await _contractTypeRepository.Query().Select(x => x.Name).ToListAsync();
                return new SuccessDataResult<List<string>>(contractTypeNames);
            }
        }

    }
}