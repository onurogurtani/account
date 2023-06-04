using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteCountryCommand : DeleteRequestBase<Country>
    {
        public class DeleteCountryCommandHandler : DeleteHandlerBase<Country, DeleteCountryCommand>
        {
            public DeleteCountryCommandHandler(ICountryRepository repository) : base(repository)
            {
            }
        }
    }
}

