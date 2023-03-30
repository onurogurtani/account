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

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Queries
{
    /// <summary>
    /// Get Names that using in contractTypes
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class GetContractTypeNamesQuery : IRequest<IDataResult<List<string>>>
    {
        public class GetContractTypeNamesQueryHandler : IRequestHandler<GetContractTypeNamesQuery, IDataResult<List<string>>>
        {
            private readonly IContractTypeRepository _contractTypeRepository;

            public GetContractTypeNamesQueryHandler(IContractTypeRepository contractTypeRepository)

            {
                _contractTypeRepository = contractTypeRepository;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<List<string>>> Handle(GetContractTypeNamesQuery request, CancellationToken cancellationToken)
            {
                var contractTypeNames = await _contractTypeRepository.Query().Select(x => x.Name).ToListAsync();
                return new SuccessDataResult<List<string>>(contractTypeNames);
            }
        }

    }
}