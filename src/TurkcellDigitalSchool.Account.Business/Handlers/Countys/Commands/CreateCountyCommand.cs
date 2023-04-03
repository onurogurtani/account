using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countys.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateCountyCommand : CreateRequestBase<County>
    {
        public class CreateCountyCommandHandler : CreateRequestHandlerBase<County>
        {
            /// <summary>
            /// Create County
            /// </summary>
            public CreateCountyCommandHandler(ICountyRepository countyRepository) : base(countyRepository)
            {
            }
        }
    }
}

