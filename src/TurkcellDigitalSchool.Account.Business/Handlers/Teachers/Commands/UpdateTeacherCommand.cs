using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    /// <summary>
    /// Update User/Teacher
    /// </summary>
    public class UpdateTeacherCommand : IRequest<IDataResult<User>>
    {
        public long Id { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

        [MessageClassAttr("Öðretmen Güncelleme")]
        public class UpdateTeacherCommandHandler : IRequestHandler<UpdateTeacherCommand, IDataResult<User>>
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

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateTeacherValidator), Priority = 2)]
            public async Task<IDataResult<User>> Handle(UpdateTeacherCommand request, CancellationToken cancellationToken)
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

