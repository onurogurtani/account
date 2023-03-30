using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands
{
    /// <summary>
    /// Create Package
    /// </summary> 
    public class CreatePackageCommand : IRequest<IResult>
    {
        public Package Package { get; set; }


        public class CreatePackageCommandHandler : IRequestHandler<CreatePackageCommand, IResult>
        {
            private readonly IPackageRepository _packageRepository;

            public CreatePackageCommandHandler(IPackageRepository packageRepository)
            {
                _packageRepository = packageRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreatePackageValidator), Priority = 2)]
            public async Task<IResult> Handle(CreatePackageCommand request, CancellationToken cancellationToken)
            {
                var isExist = _packageRepository.Query().Any(x => x.Name.Trim().ToLower() == request.Package.Name.Trim().ToLower() && x.IsActive);
                if (isExist)
                    return new ErrorResult(Constants.Messages.PackageNameAldreadyExist);

                var record = _packageRepository.Add(request.Package);
                await _packageRepository.SaveChangesAsync();

                return new SuccessDataResult<Package>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

