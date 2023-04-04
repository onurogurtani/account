using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands
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
