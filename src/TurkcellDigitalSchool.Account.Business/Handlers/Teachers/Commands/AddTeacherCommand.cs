using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.ValidationRules;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    /// <summary>
    /// Add User/Teacher
    /// </summary>
    public class AddTeacherCommand : IRequest<IDataResult<long>>
    {
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

        public class AddTeacherCommandHandler : IRequestHandler<AddTeacherCommand, IDataResult<long>>
        {
            private readonly IUserRepository _userRepository;

            public AddTeacherCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;

            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(AddTeacherValidator), Priority = 2)]
            public async Task<IDataResult<long>> Handle(AddTeacherCommand request, CancellationToken cancellationToken)
            {
                var isCitizenIdExist = _userRepository.Query().Any(q => q.CitizenId == request.CitizenId);
                if (isCitizenIdExist) { return new ErrorDataResult<long>(Messages.CitizenIdAlreadyExist); }

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
                    UserTypeEnum = UserTypeEnum.Teacher,
                    Status = true,
                    RegisterStatus = RegisterStatus.Registered,
                    UserName = request.CitizenId.ToString()
                };

                _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();

                return new SuccessDataResult<long>(user.Id, Messages.Added);
            }
        }
    }
}

