using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands
{
    public class CreateOrganisationTypeCommand : IRequest<IResult>
    {
        public OrganisationType OrganisationType { get; set; }

        [MessageClassAttr("Kurum Türü Ekleme")]
        public class CreateOrganisationTypeCommandHandler : IRequestHandler<CreateOrganisationTypeCommand, IResult>
        {
            private readonly IOrganisationTypeRepository _organisationTypeRepository;

            public CreateOrganisationTypeCommandHandler(IOrganisationTypeRepository organisationTypeRepository)
            {
                _organisationTypeRepository = organisationTypeRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateOrganisationTypeValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateOrganisationTypeCommand request, CancellationToken cancellationToken)
            {
                var organisationType = await _organisationTypeRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.OrganisationType.Name.Trim().ToLower());
                if (organisationType)
                    return new ErrorResult(SameNameAlreadyExist.PrepareRedisMessage());

                var record = _organisationTypeRepository.Add(request.OrganisationType);
                await _organisationTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<OrganisationType>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
