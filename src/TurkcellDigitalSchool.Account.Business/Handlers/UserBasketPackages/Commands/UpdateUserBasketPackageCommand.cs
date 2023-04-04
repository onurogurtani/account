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
    /// Update UserBasketPackage
    /// </summary>
    public class UpdateUserBasketPackageCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public int Quantity { get; set; }


        public class UpdateUserBasketPackageCommandHandler : IRequestHandler<UpdateUserBasketPackageCommand, IResult>
        {
            private readonly IUserBasketPackageRepository _userBasketPackageRepository;
            private readonly ITokenHelper _tokenHelper;
            public UpdateUserBasketPackageCommandHandler(IUserBasketPackageRepository userBasketPackageRepository, ITokenHelper tokenHelper)
            {
                _userBasketPackageRepository = userBasketPackageRepository;
                _tokenHelper = tokenHelper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateUserBasketPackageValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateUserBasketPackageCommand request, CancellationToken cancellationToken)
            {
                var currentUserId = _tokenHelper.GetUserIdByCurrentToken();

                var entity = await _userBasketPackageRepository.GetAsync(x => x.Id == request.Id && x.UserId == currentUserId);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                entity.Quantity = request.Quantity;

                var record = _userBasketPackageRepository.Update(entity);
                await _userBasketPackageRepository.SaveChangesAsync();

                return new SuccessDataResult<UserBasketPackage>(record, Messages.SuccessfulOperation);
            }
        }
    }
}
