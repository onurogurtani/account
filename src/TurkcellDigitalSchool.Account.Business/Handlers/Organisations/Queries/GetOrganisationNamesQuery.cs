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
    public class GetOrganisationNamesQuery : IRequest<IDataResult<List<SelectionItem>>>
    {
        public class GetOrganisationNamesQueryHandler : IRequestHandler<GetOrganisationNamesQuery, IDataResult<List<SelectionItem>>>
        {
            private readonly IOrganisationRepository _organisationRepository;

            public GetOrganisationNamesQueryHandler(IOrganisationRepository organisationRepository)
            {
                _organisationRepository = organisationRepository;
            } 

            [SecuredOperation]
            public async Task<IDataResult<List<SelectionItem>>> Handle(GetOrganisationNamesQuery request, CancellationToken cancellationToken)
            {
                var items = await _organisationRepository.Query().Select(x => new SelectionItem { Id = x.Id, Label = x.Name }).Distinct().ToListAsync(cancellationToken: cancellationToken);
                return new SuccessDataResult<List<SelectionItem>>(items);
            }
        }
    }
}