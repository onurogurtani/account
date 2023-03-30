using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands
{
    /// <summary>
    /// Delete PackageType
    /// </summary>
    public class DeletePackageTypeCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public class DeletePackageTypeCommandHandler : IRequestHandler<DeletePackageTypeCommand, IResult>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;

            public DeletePackageTypeCommandHandler(IPackageTypeRepository packageTypeRepository)
            {
                _packageTypeRepository = packageTypeRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(DeletePackageTypeValidator), Priority = 2)]
            public async Task<IResult> Handle(DeletePackageTypeCommand request, CancellationToken cancellationToken)
            {
                var getPackageType = await _packageTypeRepository.GetAsync(x => x.Id == request.Id);
                if (getPackageType == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _packageTypeRepository.Delete(getPackageType);
                await _packageTypeRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

