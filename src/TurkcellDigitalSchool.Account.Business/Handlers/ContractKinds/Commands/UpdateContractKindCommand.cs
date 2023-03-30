using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands
{
    public class UpdateContractKindCommand : IRequest<IResult>
    {
        public ContractKind ContractKind { get; set; }

        public class UpdateContractKindCommandHandler : IRequestHandler<UpdateContractKindCommand, IResult>
        {
            private readonly IContractKindRepository _contractKindRepository;
            private readonly IMapper _mapper;

            public UpdateContractKindCommandHandler(IContractKindRepository contractKindRepository, IMapper mapper)
            {
                _contractKindRepository = contractKindRepository;
                _mapper = mapper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateContractKindValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateContractKindCommand request, CancellationToken cancellationToken)
            {

                var isContractKindExist = await _contractKindRepository.Query().AnyAsync(x => x.Id != request.ContractKind.Id && (x.Name.Trim().ToLower() == request.ContractKind.Name.Trim().ToLower() && x.ContractTypeId == request.ContractKind.ContractTypeId));
                if (isContractKindExist)
                    return new ErrorResult(Messages.NameAlreadyExist);

                var entity = await _contractKindRepository.GetAsync(x => x.Id == request.ContractKind.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _mapper.Map(request.ContractKind, entity);

                var record = _contractKindRepository.Update(entity);
                await _contractKindRepository.SaveChangesAsync();

                return new SuccessDataResult<ContractKind>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

