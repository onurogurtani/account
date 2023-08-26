using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    /// <summary>
    /// Set ShareCalendarWithParent
    /// </summary>
    [LogScope]
    public class UpdateShareCalendarWithParentCommand : IRequest<IResult>
    {
        public bool ShareCalendarWithParent { get; set; }

        [MessageClassAttr("Takvimi Veli İle Paylaş")]
        public class UpdateShareCalendarWithParentCommandHandler : IRequestHandler<UpdateShareCalendarWithParentCommand, IResult>
        {
            private readonly ITokenHelper _tokenHelper;
            private readonly IUserRepository _userRepository;

            public UpdateShareCalendarWithParentCommandHandler(ITokenHelper tokenHelper, IUserRepository userRepository)
            {
                _tokenHelper = tokenHelper;
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            public async Task<IResult> Handle(UpdateShareCalendarWithParentCommand request, CancellationToken cancellationToken)
            {
                long userId = _tokenHelper.GetUserIdByCurrentToken();

                var record = await _userRepository.GetAsync(x => x.Id == userId);
                if (record == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                record.ShareCalendarWithParent = request.ShareCalendarWithParent;

                _userRepository.Update(record);
                await _userRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}