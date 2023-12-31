using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers; 
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands
{
    /// <summary>
    /// Create Package
    /// </summary> 
    [LogScope]
    [SecuredOperationScope(ClaimNames = new []{ ClaimConst.PackageAdd})]
    public class CreatePackageCommand : IRequest<IResult>
    {
        public Package Package { get; set; }

        [MessageClassAttr("Paket Ekleme")]
        public class CreatePackageCommandHandler : IRequestHandler<CreatePackageCommand, IResult>
        {
            private readonly IPackageRepository _packageRepository;
            private readonly IMediator _mediator;

            public CreatePackageCommandHandler(IPackageRepository packageRepository, IMediator mediator)
            {
                _packageRepository = packageRepository;
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordAlreadyExists = Messages.RecordAlreadyExists;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(CreatePackageCommand request, CancellationToken cancellationToken)
            {
                var isExist = _packageRepository.Query().Any(x => x.Name.Trim().ToLower() == request.Package.Name.Trim().ToLower() && x.IsActive);
                if (isExist)
                    return new ErrorResult(RecordAlreadyExists.PrepareRedisMessage());

                var resultValid = await _mediator.Send(new ValidatePackageCommand() { Package = request.Package });
                if (!resultValid.Success)
                    return new ErrorResult(resultValid.Message);

                var record = _packageRepository.Add(request.Package);
                await _packageRepository.SaveChangesAsync();

                return new SuccessDataResult<Package>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

