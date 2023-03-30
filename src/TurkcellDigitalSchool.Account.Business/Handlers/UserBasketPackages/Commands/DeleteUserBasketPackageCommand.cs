using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands
{
    /// <summary>
    /// Delete UserBasketPackage
    /// </summary>
    public class DeleteUserBasketPackageCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public class DeleteUserBasketPackageCommandHandler : IRequestHandler<DeleteUserBasketPackageCommand, IResult>
        {
            private readonly IUserBasketPackageRepository _userBasketPackageRepository;
            private readonly ITokenHelper _tokenHelper;

            public DeleteUserBasketPackageCommandHandler(IUserBasketPackageRepository userBasketPackageRepository, ITokenHelper tokenHelper)
            {
                _userBasketPackageRepository = userBasketPackageRepository;
                _tokenHelper = tokenHelper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(DeleteUserBasketPackageValidator), Priority = 2)]
            public async Task<IResult> Handle(DeleteUserBasketPackageCommand request, CancellationToken cancellationToken)
            {
                var currentUserId = _tokenHelper.GetUserIdByCurrentToken();

                var entity = await _userBasketPackageRepository.GetAsync(x => x.Id == request.Id && x.UserId == currentUserId);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _userBasketPackageRepository.Delete(entity);
                await _userBasketPackageRepository.SaveChangesAsync();

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

