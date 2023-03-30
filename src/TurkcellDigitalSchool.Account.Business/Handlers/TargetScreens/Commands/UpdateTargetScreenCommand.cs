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
    /// Update TargetScreen
    /// </summary>
    public class UpdateTargetScreenCommand : IRequest<IResult>
    {
        public TargetScreen TargetScreen { get; set; }

        public class UpdateTargetScreenCommandHandler : IRequestHandler<UpdateTargetScreenCommand, IResult>
        {
            private readonly ITargetScreenRepository _targetScreenRepository;

            public UpdateTargetScreenCommandHandler(ITargetScreenRepository targetScreenRepository   )
            {
                _targetScreenRepository = targetScreenRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateTargetScreenValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateTargetScreenCommand request, CancellationToken cancellationToken)
            {

                var entity = await _targetScreenRepository.GetAsync(x => x.Id == request.TargetScreen.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

          

                entity.Name = request.TargetScreen.Name;
                entity.PageName = request.TargetScreen.PageName;
                entity.IsActive = request.TargetScreen.IsActive;

                var record = _targetScreenRepository.Update(entity);
                await _targetScreenRepository.SaveChangesAsync();

                return new SuccessDataResult<TargetScreen>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

