using System.Linq;
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
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands
{
    /// <summary>
    /// Create UserBasketPackage
    /// </summary>
    public class CreateUserBasketPackageCommand : IRequest<IResult>
    {
        public long PackageId { get; set; }

        public class CreateUserBasketPackageCommandHandler : IRequestHandler<CreateUserBasketPackageCommand, IResult>
        {
            private readonly IUserBasketPackageRepository _userBasketPackageRepository;
            private readonly ITokenHelper _tokenHelper;

            public CreateUserBasketPackageCommandHandler(IUserBasketPackageRepository userBasketPackageRepository, ITokenHelper tokenHelper)
            {
                _userBasketPackageRepository = userBasketPackageRepository;
                _tokenHelper = tokenHelper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateUserBasketPackageValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateUserBasketPackageCommand request, CancellationToken cancellationToken)
            {
                
                var currentUserId = _tokenHelper.GetUserIdByCurrentToken();
                var entity = _userBasketPackageRepository.All().FirstOrDefault(q => q.UserId == currentUserId && q.PackageId == request.PackageId);

                if (entity == null)
                {
                    entity = new UserBasketPackage()
                    {
                        UserId = currentUserId,
                        PackageId = request.PackageId,
                        Quantity = 1
                    };

                    _userBasketPackageRepository.Add(entity);
                }
                else
                {
                    entity.Quantity++;
                }

                await _userBasketPackageRepository.SaveChangesAsync();

                return new SuccessDataResult<UserBasketPackage>(entity, Messages.SuccessfulOperation);
            }
        }
    }
}

