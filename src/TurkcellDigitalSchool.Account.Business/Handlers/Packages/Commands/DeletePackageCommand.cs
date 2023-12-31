using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands
{
    /// <summary>
    /// Delete Package
    /// </summary>
    [LogScope]
     
    public class DeletePackageCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        [MessageClassAttr("Paket Silme")]
        public class DeletePackageCommandHandler : IRequestHandler<DeletePackageCommand, IResult>
        {
            private readonly IPackageRepository _packageRepository;

            public DeletePackageCommandHandler(IPackageRepository packageRepository)
            {
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(DeletePackageCommand request, CancellationToken cancellationToken)
            {
                var getPackage = await _packageRepository.GetAsync(x => x.Id == request.Id);
                if (getPackage == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                _packageRepository.Delete(getPackage);
                await _packageRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

