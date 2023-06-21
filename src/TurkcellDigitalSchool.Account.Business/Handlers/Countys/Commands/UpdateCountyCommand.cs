using MediatR;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCountysQuery) })]
    public class UpdateCountyCommand : UpdateRequestBase<County>
    {
        public class UpdateRequestCountyCommandHandler : UpdateRequestHandlerBase<County, UpdateCountyCommand>
        {
            /// <summary>
            /// Update County
            /// </summary>
            public UpdateRequestCountyCommandHandler(ICountyRepository countyRepository) : base(countyRepository)
            {
            } 
        }
    }
}

