using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands
{
    [LogScope]
    [SecuredOperation]
    public class UpdateContractTypeCommand : IRequest<IResult>
    {
        public ContractType ContractType { get; set; }

        public class UpdateContractTypeCommandHandler : IRequestHandler<UpdateContractTypeCommand, IResult>
        {
            private readonly IContractTypeRepository _contractTypeRepository;
            private readonly IMapper _mapper;

            public UpdateContractTypeCommandHandler(IContractTypeRepository contractTypeRepository, IMapper mapper)
            {
                _contractTypeRepository = contractTypeRepository;
                _mapper = mapper;
            }

            public async Task<IResult> Handle(UpdateContractTypeCommand request, CancellationToken cancellationToken)
            {
                var contractType = await _contractTypeRepository.Query().AnyAsync(x => x.Id != request.ContractType.Id && x.Name.Trim().ToLower() == request.ContractType.Name.Trim().ToLower());
                if (contractType)
                    return new ErrorResult(Messages.NameAlreadyExist);

                var entity = await _contractTypeRepository.GetAsync(x => x.Id == request.ContractType.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _mapper.Map(request.ContractType, entity);
                
                var record = _contractTypeRepository.Update(entity);
                await _contractTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<ContractType>(record, Messages.SuccessfulOperation);
            }
        }
    }
}