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
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands
{
    /// <summary>
    /// Create UserBasketPackage
    /// </summary>
    [LogScope]
     
    public class CreateUserBasketPackageCommand : IRequest<IResult>
    {
        public long PackageId { get; set; }

        [MessageClassAttr("Kullan�c� Paket Sepeti Ekleme")]
        public class CreateUserBasketPackageCommandHandler : IRequestHandler<CreateUserBasketPackageCommand, IResult>
        {
            private readonly IUserBasketPackageRepository _userBasketPackageRepository;
            private readonly ITokenHelper _tokenHelper;

            public CreateUserBasketPackageCommandHandler(IUserBasketPackageRepository userBasketPackageRepository, ITokenHelper tokenHelper)
            {
                _userBasketPackageRepository = userBasketPackageRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
                         
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

                return new SuccessDataResult<UserBasketPackage>(entity, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

