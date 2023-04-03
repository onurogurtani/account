using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteCityCommand : DeleteRequestBase<City>
    {
        public class DeleteCityCommandHandler : DeleteRequestHandlerBase<City>
        {
            /// <summary>
            /// Delete City
            /// </summary>
            public DeleteCityCommandHandler(ICityRepository repository) : base(repository)
            {
            }
        }
    }
}

