using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteInstitutionTypeCommand : DeleteRequestBase<InstitutionType>
    {
        public class DeleteInstitutionTypeCommandHandler : DeleteRequestHandlerBase<InstitutionType>
        {
            /// <summary>
            /// Delete Institution Type
            /// </summary>
            public DeleteInstitutionTypeCommandHandler(IInstitutionTypeRepository repository) : base(repository)
            {
            }
        }
    }
}

