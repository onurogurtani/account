using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands
{
    /// <summary>
    /// Delete PackageType
    /// </summary>
    public class DeletePackageTypeCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        [MessageClassAttr("Paket Türü Silme")]
        public class DeletePackageTypeCommandHandler : IRequestHandler<DeletePackageTypeCommand, IResult>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;

            public DeletePackageTypeCommandHandler(IPackageTypeRepository packageTypeRepository)
            {
                _packageTypeRepository = packageTypeRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation] 
            public async Task<IResult> Handle(DeletePackageTypeCommand request, CancellationToken cancellationToken)
            {
                var getPackageType = await _packageTypeRepository.GetAsync(x => x.Id == request.Id);
                if (getPackageType == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                _packageTypeRepository.Delete(getPackageType);
                await _packageTypeRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

