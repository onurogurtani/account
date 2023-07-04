using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands
{
    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class DeleteInstitutionTypeCommand : DeleteRequestBase<InstitutionType>
    {
        public class DeleteRequestInstitutionTypeCommandHandler : DeleteRequestHandlerBase<InstitutionType, DeleteInstitutionTypeCommand>
        {
            /// <summary>
            /// Delete Institution Type
            /// </summary>
            public DeleteRequestInstitutionTypeCommandHandler(IInstitutionTypeRepository repository) : base(repository)
            {
            }
        }
    }
}

