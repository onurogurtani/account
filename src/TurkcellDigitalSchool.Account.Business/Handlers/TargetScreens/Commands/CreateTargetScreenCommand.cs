using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands
{
    /// <summary>
    /// Create TargetScreen
    /// </summary>
    public class CreateTargetScreenCommand : IRequest<IResult>
    {
        public TargetScreen TargetScreen { get; set; }


        public class CreateTargetScreenCommandHandler : IRequestHandler<CreateTargetScreenCommand, IResult>
        {
            private readonly ITargetScreenRepository _targetScreenRepository;

            public CreateTargetScreenCommandHandler(ITargetScreenRepository targetScreenRepository)
            {
                _targetScreenRepository = targetScreenRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateTargetScreenValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateTargetScreenCommand request, CancellationToken cancellationToken)
            {

                var record = _targetScreenRepository.Add(request.TargetScreen);
                await _targetScreenRepository.SaveChangesAsync();

                return new SuccessDataResult<TargetScreen>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

