using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    /// <summary>
    /// SetStatus User
    /// </summary>
    public class SetStatusUserCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public bool Status { get; set; }

        [MessageClassAttr("Kullanıcı Durum Set Etme")]
        public class SetStatusUserCommandHandler : IRequestHandler<SetStatusUserCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public SetStatusUserCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(SetStatusUserValidator), Priority = 2)]
            public async Task<IResult> Handle(SetStatusUserCommand request, CancellationToken cancellationToken)
            {
                var record = await _userRepository.GetAsync(x => x.Id == request.Id);
                if (record == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                record.Status = request.Status;

                _userRepository.Update(record);
                await _userRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

