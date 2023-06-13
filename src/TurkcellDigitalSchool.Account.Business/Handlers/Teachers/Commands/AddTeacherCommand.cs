using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    /// <summary>
    /// Add User/Teacher
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class AddTeacherCommand : IRequest<DataResult<long>>
    {
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

        [MessageClassAttr("Öğretmen Ekleme")]
        public class AddTeacherCommandHandler : IRequestHandler<AddTeacherCommand, DataResult<long>>
        {
            private readonly IUserRepository _userRepository;

            public AddTeacherCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string CitizenIdAlreadyExist = Messages.CitizenIdAlreadyExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string Added = Messages.Added;
             
            public async Task<DataResult<long>> Handle(AddTeacherCommand request, CancellationToken cancellationToken)
            {
                var isCitizenIdExist = _userRepository.Query().Any(q => q.CitizenId == request.CitizenId);
                if (isCitizenIdExist) { return new ErrorDataResult<long>(CitizenIdAlreadyExist.PrepareRedisMessage()); }

                var teacherPassword = request.CitizenId.ToString().Substring(5);

                HashingHelper.CreatePasswordHash(teacherPassword, out var passwordSalt, out var passwordHash);

                var user = new User
                {
                    CitizenId = request.CitizenId,
                    Name = request.Name,
                    SurName = request.SurName,
                    Email = request.Email,
                    MobilePhones = request.MobilePhones,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    UserType = UserType.Teacher,
                    Status = true,
                    RegisterStatus = RegisterStatus.Registered,
                    UserName = request.CitizenId.ToString()
                };

                _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();

                return new SuccessDataResult<long>(user.Id, Added.PrepareRedisMessage());
            }
        }
    }
}

