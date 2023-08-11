using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    /// <summary>
    /// Update Student Access To Chat
    /// </summary>
    [LogScope]
    public class UpdateStudentAccessToChatCommand : IRequest<IResult>
    {
        public long ParentId { get; set; }
        public bool StudentAccessToChat { get; set; }

        public class UpdateStudentAccessToChatCommandHandler : IRequestHandler<UpdateStudentAccessToChatCommand, IResult>
        {
            private readonly IStudentParentInformationRepository _studentParentInformationRepository;

            public UpdateStudentAccessToChatCommandHandler(IStudentParentInformationRepository studentParentInformationRepository)
            {
                _studentParentInformationRepository = studentParentInformationRepository;
            }

            public async Task<IResult> Handle(UpdateStudentAccessToChatCommand request, CancellationToken cancellationToken)
            {
                var record = await _studentParentInformationRepository.GetAsync(x => x.ParentId == request.ParentId);
                if (record == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                record.StudentAccessToChat = request.StudentAccessToChat;

                _studentParentInformationRepository.Update(record);
                await _studentParentInformationRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

