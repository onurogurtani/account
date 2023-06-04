using MediatR;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCountysQuery) })]
    public class DeleteCountyCommand : DeleteRequestBase<County>
    {
        public class DeleteRequestCountyCommandHandler : DeleteRequestHandlerBase<County, DeleteCountyCommand>
        {
            /// <summary>
            /// Delete County
            /// </summary>
            public DeleteRequestCountyCommandHandler(ICountyRepository repository) : base(repository)
            {
            } 
        }
    }
}

