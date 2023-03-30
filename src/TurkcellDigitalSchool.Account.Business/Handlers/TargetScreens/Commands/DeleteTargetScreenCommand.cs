using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands
{
    /// <summary>
    /// Delete TargetScreen
    /// </summary>
    public class DeleteTargetScreenCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public class DeleteTargetScreenCommandHandler : IRequestHandler<DeleteTargetScreenCommand, IResult>
        {
            private readonly ITargetScreenRepository _targetScreenRepository;

            public DeleteTargetScreenCommandHandler(ITargetScreenRepository targetScreenRepository)
            {
                _targetScreenRepository = targetScreenRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(DeleteTargetScreenValidator), Priority = 2)]
            public async Task<IResult> Handle(DeleteTargetScreenCommand request, CancellationToken cancellationToken)
            {
                var getTargetScreen = await _targetScreenRepository.GetAsync(x => x.Id == request.Id);
                if (getTargetScreen == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _targetScreenRepository.Delete(getTargetScreen);
                await _targetScreenRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

