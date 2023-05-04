using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands
{
    public class CreateContractKindCommand : IRequest<IResult>
    {
        public ContractKind ContractKind { get; set; }

        public class CreateContractKindCommandHandler : IRequestHandler<CreateContractKindCommand, IResult>
        {
            private readonly IContractKindRepository _contractKindRepository;

            public CreateContractKindCommandHandler(IContractKindRepository contractKindRepository)
            {
                _contractKindRepository = contractKindRepository;
            }

            [SecuredOperation] 
            public async Task<IResult> Handle(CreateContractKindCommand request, CancellationToken cancellationToken)
            {
                var isContractKindExist = await _contractKindRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.ContractKind.Name.Trim().ToLower() && x.ContractTypeId == request.ContractKind.ContractTypeId);
                if (isContractKindExist)
                    return new ErrorResult(Messages.NameAlreadyExist);

                var record = _contractKindRepository.Add(request.ContractKind);
                await _contractKindRepository.SaveChangesAsync();

                return new SuccessDataResult<ContractKind>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

