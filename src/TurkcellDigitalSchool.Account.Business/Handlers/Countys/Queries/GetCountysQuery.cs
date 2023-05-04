using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetCountysQuery : QueryByFilterRequestBase<County>
    {
        public class GetCountysQueryHandler : QueryByFilterRequestHandlerBase<County>
        {
            /// <summary>
            /// Get Countys
            /// </summary>
            public GetCountysQueryHandler(ICountyRepository repository) : base(repository)
            {
            }
        }
    }
}