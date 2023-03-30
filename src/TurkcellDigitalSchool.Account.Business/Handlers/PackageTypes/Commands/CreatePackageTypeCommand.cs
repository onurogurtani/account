using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands
{
    /// <summary>
    /// Create PackageType
    /// </summary>
    public class CreatePackageTypeCommand : IRequest<IResult>
    {
        public PackageType PackageType { get; set; }


        public class CreatePackageTypeCommandHandler : IRequestHandler<CreatePackageTypeCommand, IResult>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;

            public CreatePackageTypeCommandHandler(IPackageTypeRepository packageTypeRepository)
            {
                _packageTypeRepository = packageTypeRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreatePackageTypeValidator), Priority = 2)]
            public async Task<IResult> Handle(CreatePackageTypeCommand request, CancellationToken cancellationToken)
            {

                var record = _packageTypeRepository.Add(request.PackageType);
                await _packageTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<PackageType>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

