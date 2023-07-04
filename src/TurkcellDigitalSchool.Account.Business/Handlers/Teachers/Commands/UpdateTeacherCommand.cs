using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers; 
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    /// <summary>
    /// Update User/Teacher
    /// </summary>
    [LogScope]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.TeachersEdit })]
    public class UpdateTeacherCommand : IRequest<DataResult<User>>
    {
        public long Id { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

        [MessageClassAttr("Öðretmen Güncelleme")]
        public class UpdateTeacherCommandHandler : IRequestHandler<UpdateTeacherCommand, DataResult<User>>
        {
            private readonly IUserRepository _userRepository;
            public UpdateTeacherCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string CitizenIdAlreadyExist = Messages.CitizenIdAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string UserIsNotTeacher = Constants.Messages.UserIsNotTeacher;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
                         
            public async Task<DataResult<User>> Handle(UpdateTeacherCommand request, CancellationToken cancellationToken)
            {
                var isCitizenIdExist = _userRepository.Query().Any(q => q.Id != request.Id && q.CitizenId == request.CitizenId);
                if (isCitizenIdExist) { return new ErrorDataResult<User>(CitizenIdAlreadyExist.PrepareRedisMessage()); }

                var entity = await _userRepository.GetAsync(x => x.Id == request.Id);
                if (entity == null)
                    return new ErrorDataResult<User>(RecordDoesNotExist.PrepareRedisMessage());
                if (entity.UserType != null && entity.UserType != UserType.Teacher)
                    return new ErrorDataResult<User>(UserIsNotTeacher.PrepareRedisMessage());

                entity.Name = request.Name;
                entity.SurName = request.SurName;
                entity.CitizenId = request.CitizenId;
                entity.Email = request.Email;
                entity.MobilePhones = request.MobilePhones;

                var record = _userRepository.Update(entity);
                await _userRepository.SaveChangesAsync();

                return new SuccessDataResult<User>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

