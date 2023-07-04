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
    public class UpdateInstitutionTypeCommand : UpdateRequestBase<InstitutionType>
    {
        public class UpdateRequestInstitutionTypeCommandHandler : UpdateRequestHandlerBase<InstitutionType, UpdateInstitutionTypeCommand>
        {
            /// <summary>
            /// Update Institution Type
            /// </summary>
            public UpdateRequestInstitutionTypeCommandHandler(IInstitutionTypeRepository ınstitutionTypeRepository) : base(ınstitutionTypeRepository)
            {
            }
        }
    }
}

