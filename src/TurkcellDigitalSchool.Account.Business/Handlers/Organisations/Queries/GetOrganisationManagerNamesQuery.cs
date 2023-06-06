using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    [ExcludeFromCodeCoverage]
    [LogScope]
    [SecuredOperation]
    public class GetOrganisationManagerNamesQuery : IRequest<DataResult<List<SelectionItem>>>
    {
        public class GetOrganisationManagerNamesQueryHandler : IRequestHandler<GetOrganisationManagerNamesQuery, DataResult<List<SelectionItem>>>
        {
            private readonly IOrganisationRepository _organisationRepository;

            public GetOrganisationManagerNamesQueryHandler(IOrganisationRepository organisationRepository)
            {
                _organisationRepository = organisationRepository;
            } 

            public async Task<DataResult<List<SelectionItem>>> Handle(GetOrganisationManagerNamesQuery request, CancellationToken cancellationToken)
            {
                var items = await _organisationRepository.Query().Select(x => new SelectionItem { Id = x.Id, Label = x.OrganisationManager }).Distinct().ToListAsync(cancellationToken: cancellationToken);
                return new SuccessDataResult<List<SelectionItem>>(items);
            }
        }
    }
}