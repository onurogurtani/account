using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants; 
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries
{
    [LogScope] 
    public class GetContractKindQuery : IRequest<DataResult<ContractKind>>
    {
        public long Id { get; set; }

        public class GetContractKindQueryHandler : IRequestHandler<GetContractKindQuery, DataResult<ContractKind>>
        {
            private readonly IContractKindRepository _contractKindRepository;

            public GetContractKindQueryHandler(IContractKindRepository contractKindRepository)
            {
                _contractKindRepository = contractKindRepository;
            }
            
            public virtual async Task<DataResult<ContractKind>> Handle(GetContractKindQuery request, CancellationToken cancellationToken)
            {
                var query = _contractKindRepository.Query()
                    .Include(x => x.ContractType)
                    .AsQueryable();

                var data = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (data == null)
                    return new ErrorDataResult<ContractKind>(null, Messages.RecordIsNotFound);

                return new SuccessDataResult<ContractKind>(data, Messages.SuccessfulOperation);
            }
        }
    }
}