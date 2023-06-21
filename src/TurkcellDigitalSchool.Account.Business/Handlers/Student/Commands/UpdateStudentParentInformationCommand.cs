using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentParentInformationCommand : IRequest<IResult>
    {
        public long ParentId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public long? CitizenId { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public class UpdateStudentParentInformationCommandHandler : IRequestHandler<UpdateStudentParentInformationCommand, IResult>
        {
            private readonly IStudentParentInformationRepository _studentParentInformationRepository;
            private readonly IUserRepository _userRepository;

            public UpdateStudentParentInformationCommandHandler(IStudentParentInformationRepository studentParentInformationRepository, IUserRepository userRepository)
            {
                _studentParentInformationRepository = studentParentInformationRepository;
                _userRepository = userRepository;
            }


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            public async Task<IResult> Handle(UpdateStudentParentInformationCommand request, CancellationToken cancellationToken)
            {
                //TODO UserId Tokendan alınacaktır?
                var existStudentParentInfo = _userRepository.Query().FirstOrDefault(w => w.Id == request.ParentId);
                if (existStudentParentInfo==null)
                {
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                }

                existStudentParentInfo.Name = request.Name;
                existStudentParentInfo.SurName = request.SurName;
                existStudentParentInfo.CitizenId = request.CitizenId;
                existStudentParentInfo.Email = request.Email;
                existStudentParentInfo.MobilePhones = request.MobilePhones;
                await _userRepository.UpdateAndSaveAsync(existStudentParentInfo);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }

    }
}
