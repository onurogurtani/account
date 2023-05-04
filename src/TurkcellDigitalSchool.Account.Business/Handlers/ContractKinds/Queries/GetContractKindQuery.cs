using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries
{
   
    public class GetContractKindQuery : IRequest<IDataResult<ContractKind>>
    {
        public long Id { get; set; }

        public class GetContractKindQueryHandler : IRequestHandler<GetContractKindQuery, IDataResult<ContractKind>>
        {
            private readonly IContractKindRepository _contractKindRepository;

            public GetContractKindQueryHandler(IContractKindRepository contractKindRepository)
            {
                _contractKindRepository = contractKindRepository;
            }

     
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation]
            public virtual async Task<IDataResult<ContractKind>> Handle(GetContractKindQuery request, CancellationToken cancellationToken)
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