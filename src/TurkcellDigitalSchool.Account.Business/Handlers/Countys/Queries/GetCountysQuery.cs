using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countys.Queries
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