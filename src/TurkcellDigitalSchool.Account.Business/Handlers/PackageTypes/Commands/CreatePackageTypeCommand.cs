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
    /// Create PackageType
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class CreatePackageTypeCommand : IRequest<IResult>
    {
        public PackageType PackageType { get; set; }

        [MessageClassAttr("Paket Türü Ekleme")]
        public class CreatePackageTypeCommandHandler : IRequestHandler<CreatePackageTypeCommand, IResult>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;

            public CreatePackageTypeCommandHandler(IPackageTypeRepository packageTypeRepository)
            {
                _packageTypeRepository = packageTypeRepository;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(CreatePackageTypeCommand request, CancellationToken cancellationToken)
            {

                var record = _packageTypeRepository.Add(request.PackageType);
                await _packageTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<PackageType>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

