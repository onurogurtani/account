using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Commands
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

