using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [CacheScope] 
    [LogScope]
    public class GetCitysQuery : QueryByFilterRequestBase<City>
    {
        public class GetCitysQueryHandler : QueryByFilterBase<City>, IRequestHandler<GetCitysQuery, DataResult<PagedList<City>>>
        {
            public GetCitysQueryHandler(ICityRepository repository) : base(repository)
            {
            }

            public async Task<DataResult<PagedList<City>>> Handle(GetCitysQuery request, CancellationToken cancellationToken)
            {
                return await base.Handle(request, cancellationToken);
            }
        }
    }
}