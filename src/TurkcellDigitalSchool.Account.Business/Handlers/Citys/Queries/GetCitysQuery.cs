using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetCitysQuery : QueryByFilterRequestBase<City>
    {
        public class GetCitysQueryHandler : QueryByFilterRequestHandlerBase<City>
        {
            /// <summary>
            /// Get Citys
            /// </summary>
            public GetCitysQueryHandler(ICityRepository repository) : base(repository)
            {
            }
        }
    }
}