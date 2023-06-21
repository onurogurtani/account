using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    /// <summary>
    /// SetStatus User
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
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
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
                         
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

