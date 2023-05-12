using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands
{
    /// <summary>
    /// Delete Admin User
    /// </summary>
    public class DeleteAdminCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public class DeleteAdminCommandHandler : IRequestHandler<DeleteAdminCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public DeleteAdminCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [SecuredOperation]
             
            public async Task<IResult> Handle(DeleteAdminCommand request, CancellationToken cancellationToken)
            {
                var getAdmin = await _userRepository.GetAsync(x => x.Id == request.Id);
                if (getAdmin == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _userRepository.Delete(getAdmin);
                await _userRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

