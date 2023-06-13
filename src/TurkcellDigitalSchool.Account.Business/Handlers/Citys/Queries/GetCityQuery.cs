using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]
    public class GetCityQuery : QueryByIdRequestBase<City>
    {
        public class GetCityQueryHandler : QueryByIdRequestHandlerBase<City, GetCityQuery>
        {
            public GetCityQueryHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }
        }
    }
}
