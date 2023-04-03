using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countrys.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteCountryCommand : DeleteRequestBase<Country>
    {
        public class DeleteCountryCommandHandler : DeleteRequestHandlerBase<Country>
        {
            public DeleteCountryCommandHandler(ICountryRepository repository) : base(repository)
            {
            }
        }
    }
}

