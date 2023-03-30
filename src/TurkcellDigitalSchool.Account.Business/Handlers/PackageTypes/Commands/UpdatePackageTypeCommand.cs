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
    /// Update PackageType
    /// </summary>
    public class UpdatePackageTypeCommand : IRequest<IResult>
    {
        public PackageType PackageType { get; set; }


        public class UpdatePackageTypeCommandHandler : IRequestHandler<UpdatePackageTypeCommand, IResult>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;
            private readonly IPackageTypeTargetScreenRepository _packageTypeTargetScreenRepository;

            public UpdatePackageTypeCommandHandler(IPackageTypeRepository packageTypeRepository, IPackageTypeTargetScreenRepository packageTypeTargetScreenRepository)
            {
                _packageTypeRepository = packageTypeRepository;
                _packageTypeTargetScreenRepository = packageTypeTargetScreenRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreatePackageTypeValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdatePackageTypeCommand request, CancellationToken cancellationToken)
            {

                var entity = await _packageTypeRepository.GetAsync(x => x.Id == request.PackageType.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                var packageTypeTargetScreens = await _packageTypeTargetScreenRepository.GetListAsync(x => x.PackageTypeId == request.PackageType.Id);
                _packageTypeTargetScreenRepository.DeleteRange(packageTypeTargetScreens);

                entity.PackageTypeTargetScreens = request.PackageType.PackageTypeTargetScreens;
                entity.Name = request.PackageType.Name;
                entity.IsCanSeeTargetScreen = request.PackageType.IsCanSeeTargetScreen;
                entity.IsActive = request.PackageType.IsActive;


                var record = _packageTypeRepository.Update(entity);
                await _packageTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<PackageType>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

