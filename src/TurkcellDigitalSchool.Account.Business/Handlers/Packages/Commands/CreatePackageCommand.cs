using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
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

        [MessageClassAttr("Paket Ekleme")]
        public class CreatePackageCommandHandler : IRequestHandler<CreatePackageCommand, IResult>
        {
            private readonly IPackageRepository _packageRepository;

            public CreatePackageCommandHandler(IPackageRepository packageRepository)
            {
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordAlreadyExists = Messages.RecordAlreadyExists;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreatePackageValidator), Priority = 2)]
            public async Task<IResult> Handle(CreatePackageCommand request, CancellationToken cancellationToken)
            {
                var isExist = _packageRepository.Query().Any(x => x.Name.Trim().ToLower() == request.Package.Name.Trim().ToLower() && x.IsActive);
                if (isExist)
                    return new ErrorResult(RecordAlreadyExists.PrepareRedisMessage());

                var record = _packageRepository.Add(request.Package);
                await _packageRepository.SaveChangesAsync();

                return new SuccessDataResult<Package>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

