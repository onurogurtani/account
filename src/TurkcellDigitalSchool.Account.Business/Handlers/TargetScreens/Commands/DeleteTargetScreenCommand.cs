using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands
{
    /// <summary>
    /// Delete TargetScreen
    /// </summary>
    public class DeleteTargetScreenCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        [MessageClassAttr("Hedef Ekraný Silme")]
        public class DeleteTargetScreenCommandHandler : IRequestHandler<DeleteTargetScreenCommand, IResult>
        {
            private readonly ITargetScreenRepository _targetScreenRepository;

            public DeleteTargetScreenCommandHandler(ITargetScreenRepository targetScreenRepository)
            {
                _targetScreenRepository = targetScreenRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation]
             
            public async Task<IResult> Handle(DeleteTargetScreenCommand request, CancellationToken cancellationToken)
            {
                var getTargetScreen = await _targetScreenRepository.GetAsync(x => x.Id == request.Id);
                if (getTargetScreen == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                _targetScreenRepository.Delete(getTargetScreen);
                await _targetScreenRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

