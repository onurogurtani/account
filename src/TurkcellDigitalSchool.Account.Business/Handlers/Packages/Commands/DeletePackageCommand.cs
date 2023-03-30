using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands
{
    /// <summary>
    /// Delete Package
    /// </summary>
    public class DeletePackageCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public class DeletePackageCommandHandler : IRequestHandler<DeletePackageCommand, IResult>
        {
            private readonly IPackageRepository _packageRepository;

            public DeletePackageCommandHandler(IPackageRepository packageRepository)
            {
                _packageRepository = packageRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(DeletePackageValidator), Priority = 2)]
            public async Task<IResult> Handle(DeletePackageCommand request, CancellationToken cancellationToken)
            {
                var getPackage = await _packageRepository.GetAsync(x => x.Id == request.Id);
                if (getPackage == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _packageRepository.Delete(getPackage);
                await _packageRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

