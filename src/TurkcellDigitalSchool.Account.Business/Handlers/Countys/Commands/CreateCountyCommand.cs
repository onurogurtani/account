using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCountysQuery) })]
    public class CreateCountyCommand : CreateRequestBase<County>
    {
        public class CreateRequestCountyCommandHandler : CreateRequestHandlerBase<County, CreateCountyCommand>
        {
            /// <summary>
            /// Create County
            /// </summary>
            public CreateRequestCountyCommandHandler(ICountyRepository countyRepository) : base(countyRepository)
            {
            } 
        }
    }
}

