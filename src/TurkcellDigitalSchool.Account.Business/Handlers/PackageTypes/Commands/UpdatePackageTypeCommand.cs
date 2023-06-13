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

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands
{
    /// <summary>
    /// Update PackageType
    /// </summary>
    [TransactionScope]
    [LogScope]
    [SecuredOperationScope]
    public class UpdatePackageTypeCommand : IRequest<IResult>
    {
        public PackageType PackageType { get; set; }

        [MessageClassAttr("Paket Türü Güncelleme")]
        public class UpdatePackageTypeCommandHandler : IRequestHandler<UpdatePackageTypeCommand, IResult>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;
            private readonly IPackageTypeTargetScreenRepository _packageTypeTargetScreenRepository;

            public UpdatePackageTypeCommandHandler(IPackageTypeRepository packageTypeRepository, IPackageTypeTargetScreenRepository packageTypeTargetScreenRepository)
            {
                _packageTypeRepository = packageTypeRepository;
                _packageTypeTargetScreenRepository = packageTypeTargetScreenRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            public async Task<IResult> Handle(UpdatePackageTypeCommand request, CancellationToken cancellationToken)
            {

                var entity = await _packageTypeRepository.GetAsync(x => x.Id == request.PackageType.Id);
                if (entity == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var packageTypeTargetScreens = await _packageTypeTargetScreenRepository.GetListAsync(x => x.PackageTypeId == request.PackageType.Id);
                _packageTypeTargetScreenRepository.DeleteRange(packageTypeTargetScreens);

                entity.PackageTypeTargetScreens = request.PackageType.PackageTypeTargetScreens;
                entity.Name = request.PackageType.Name;
                entity.IsCanSeeTargetScreen = request.PackageType.IsCanSeeTargetScreen;
                entity.IsActive = request.PackageType.IsActive;


                var record = _packageTypeRepository.Update(entity);
                await _packageTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<PackageType>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

