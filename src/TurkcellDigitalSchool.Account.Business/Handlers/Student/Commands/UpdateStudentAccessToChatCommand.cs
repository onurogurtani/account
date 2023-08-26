using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    /// <summary>
    /// Update Student Access To Chat
    /// </summary>
    [LogScope]
    public class UpdateStudentAccessToChatCommand : IRequest<IResult>
    { 
        public bool StudentAccessToChat { get; set; }

        public class UpdateStudentAccessToChatCommandHandler : IRequestHandler<UpdateStudentAccessToChatCommand, IResult>
        {
            private readonly IStudentParentInformationRepository _studentParentInformationRepository;
            private readonly ITokenHelper _tokenHelper;

            public UpdateStudentAccessToChatCommandHandler(IStudentParentInformationRepository studentParentInformationRepository, ITokenHelper tokenHelper)
            {
                _studentParentInformationRepository = studentParentInformationRepository;
                _tokenHelper = tokenHelper;
            }

            public async Task<IResult> Handle(UpdateStudentAccessToChatCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var records = await _studentParentInformationRepository.GetListAsync(x => x.ParentId == userId);
                if (records == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                foreach (var record in records)
                {
                    record.StudentAccessToChat = request.StudentAccessToChat;
                }

                _studentParentInformationRepository.UpdateRange(records);
                await _studentParentInformationRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

