using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands
{
    /// <summary>
    /// Create ContractType
    /// </summary>
    public class CreateContractTypeCommand : IRequest<IResult>
    {
        public ContractType ContractType { get; set; }


        public class CreateContractTypeCommandHandler : IRequestHandler<CreateContractTypeCommand, IResult>
        {
            private readonly IContractTypeRepository _contractTypeRepository;

            public CreateContractTypeCommandHandler(IContractTypeRepository ContractTypeRepository)
            {
                _contractTypeRepository = ContractTypeRepository;
            }

            [SecuredOperation] 
            public async Task<IResult> Handle(CreateContractTypeCommand request, CancellationToken cancellationToken)
            {
                var contractType = await _contractTypeRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.ContractType.Name.Trim().ToLower());
                if (contractType)
                    return new ErrorResult(Messages.NameAlreadyExist);

                var record = _contractTypeRepository.Add(request.ContractType);
                await _contractTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<ContractType>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

