using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteCountryCommand : DeleteRequestBase<Country>
    {
        public class DeleteRequestCountryCommandHandler : DeleteRequestHandlerBase<Country, DeleteCountryCommand>
        {
            public DeleteRequestCountryCommandHandler(ICountryRepository repository) : base(repository)
            {
            }
        }
    }
}

