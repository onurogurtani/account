using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
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
    /// Create TargetScreen
    /// </summary>
    public class CreateTargetScreenCommand : IRequest<IResult>
    {
        public TargetScreen TargetScreen { get; set; }

        [MessageClassAttr("Hedef Ekraný Ekleme")]
        public class CreateTargetScreenCommandHandler : IRequestHandler<CreateTargetScreenCommand, IResult>
        {
            private readonly ITargetScreenRepository _targetScreenRepository;

            public CreateTargetScreenCommandHandler(ITargetScreenRepository targetScreenRepository)
            {
                _targetScreenRepository = targetScreenRepository;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation]
             
            public async Task<IResult> Handle(CreateTargetScreenCommand request, CancellationToken cancellationToken)
            {
                var record = _targetScreenRepository.Add(request.TargetScreen);
                await _targetScreenRepository.SaveChangesAsync();

                return new SuccessDataResult<TargetScreen>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

