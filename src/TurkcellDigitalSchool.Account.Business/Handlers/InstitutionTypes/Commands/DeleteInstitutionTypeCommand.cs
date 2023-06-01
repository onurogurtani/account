using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class DeleteInstitutionTypeCommand : DeleteRequestBase<InstitutionType>
    {
        public class DeleteInstitutionTypeCommandHandler : DeleteHandlerBase<InstitutionType, DeleteInstitutionTypeCommand>
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

