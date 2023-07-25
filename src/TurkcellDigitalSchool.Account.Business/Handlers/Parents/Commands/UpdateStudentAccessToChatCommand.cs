using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands
{
    /// <summary>
    /// Update Student Access To Chat
    /// </summary>
    [LogScope]
    public class UpdateStudentAccessToChatCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public bool StudentAccessToChat { get; set; }

        public class UpdateStudentAccessToChatCommandHandler : IRequestHandler<UpdateStudentAccessToChatCommand, IResult>
        {
            private readonly IParentRepository _parentRepository;

            public UpdateStudentAccessToChatCommandHandler(IParentRepository parentRepository)
            {
                _parentRepository = parentRepository;
            }

            public async Task<IResult> Handle(UpdateStudentAccessToChatCommand request, CancellationToken cancellationToken)
            {
                var record = await _parentRepository.GetAsync(x => x.Id == request.Id);
                if (record == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                record.StudentAccessToChat = request.StudentAccessToChat;

                _parentRepository.Update(record);
                await _parentRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

