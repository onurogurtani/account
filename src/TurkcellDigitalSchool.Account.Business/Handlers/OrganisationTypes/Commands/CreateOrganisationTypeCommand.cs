using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands
{
    public class CreateOrganisationTypeCommand : IRequest<IResult>
    {
        public OrganisationType OrganisationType { get; set; }

        public class CreateOrganisationTypeCommandHandler : IRequestHandler<CreateOrganisationTypeCommand, IResult>
        {
            private readonly IOrganisationTypeRepository _organisationTypeRepository;

            public CreateOrganisationTypeCommandHandler(IOrganisationTypeRepository organisationTypeRepository)
            {
                _organisationTypeRepository = organisationTypeRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateOrganisationTypeValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateOrganisationTypeCommand request, CancellationToken cancellationToken)
            {
                var organisationType = await _organisationTypeRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.OrganisationType.Name.Trim().ToLower());
                if (organisationType)
                    return new ErrorResult(Messages.SameNameAlreadyExist);

                var record = _organisationTypeRepository.Add(request.OrganisationType);
                await _organisationTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<OrganisationType>(record, Messages.SuccessfulOperation);
            }
        }
    }
}
