using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countys.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateCountyCommand : UpdateRequestBase<County>
    {
        public class UpdateCountyCommandHandler : UpdateRequestHandlerBase<County>
        {
            /// <summary>
            /// Update County
            /// </summary>
            public UpdateCountyCommandHandler(ICountyRepository countyRepository) : base(countyRepository)
            {
            }
        }
    }
}

