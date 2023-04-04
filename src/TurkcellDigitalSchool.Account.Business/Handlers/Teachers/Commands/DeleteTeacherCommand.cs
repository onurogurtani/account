using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    /// <summary>
    /// Delete User/Teacher
    /// </summary>
    public class DeleteTeacherCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public long OrganisationId { get; set; }

        public class DeleteTeacherCommandHandler : IRequestHandler<DeleteTeacherCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IOrganisationUserRepository _organisationUserRepository;

            public DeleteTeacherCommandHandler(IUserRepository userRepository, IOrganisationUserRepository organisationUserRepository)
            {
                _userRepository = userRepository;
                _organisationUserRepository = organisationUserRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(DeleteTeacherValidator), Priority = 2)]
            public async Task<IResult> Handle(DeleteTeacherCommand request, CancellationToken cancellationToken)
            {
                var targetOrganisationUser = _organisationUserRepository.Query().Where(x => x.UserId == request.UserId && x.OrganisationId == request.OrganisationId).FirstOrDefault();
                if (targetOrganisationUser == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _organisationUserRepository.Delete(targetOrganisationUser);
                await _organisationUserRepository.SaveChangesAsync();

                var isAnotherUserRelationExist = _organisationUserRepository.Query().Any(x => x.UserId == request.UserId);
                if (!isAnotherUserRelationExist)
                {
                    var userEntity = await _userRepository.GetAsync(x => x.Id == request.UserId);
                    if (userEntity == null)
                    {
                        return new ErrorDataResult<User>(Messages.RecordDoesNotExist);
                    }

                    userEntity.Status = false;
                    _userRepository.Update(userEntity);
                    await _userRepository.SaveChangesAsync();
                }

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}
