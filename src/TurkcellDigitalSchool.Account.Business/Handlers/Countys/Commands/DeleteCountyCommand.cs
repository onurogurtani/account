using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countys.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteCountyCommand : DeleteRequestBase<County>
    {
        public class DeleteCountyCommandHandler : DeleteRequestHandlerBase<County>
        {
            /// <summary>
            /// Delete County
            /// </summary>
            public DeleteCountyCommandHandler(ICountyRepository repository) : base(repository)
            {
            }
        }
    }
}

