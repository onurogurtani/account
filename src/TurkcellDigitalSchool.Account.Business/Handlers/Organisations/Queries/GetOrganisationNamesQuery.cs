using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOrganisationNamesQuery : IRequest<IDataResult<List<SelectionItem>>>
    {
        public class GetOrganisationNamesQueryHandler : IRequestHandler<GetOrganisationNamesQuery, IDataResult<List<SelectionItem>>>
        {
            private readonly IOrganisationRepository _organisationRepository;

            public GetOrganisationNamesQueryHandler(IOrganisationRepository organisationRepository)
            {
                _organisationRepository = organisationRepository;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<List<SelectionItem>>> Handle(GetOrganisationNamesQuery request, CancellationToken cancellationToken)
            {
                var items = await _organisationRepository.Query().Select(x => new SelectionItem { Id = x.Id, Label = x.Name }).Distinct().ToListAsync(cancellationToken: cancellationToken);
                return new SuccessDataResult<List<SelectionItem>>(items);
            }
        }
    }
}