using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class GetCityQuery : QueryByIdRequestBase<City>
    {
        public class GetCityQueryHandler : QueryByIdBase<City>, IRequestHandler<GetCityQuery, IDataResult<City>>
        {
            public GetCityQueryHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }

            public async Task<IDataResult<City>> Handle(GetCityQuery request, CancellationToken cancellationToken)
            {
                return await base.Handle(request, cancellationToken);
            }
        }
    }
}
