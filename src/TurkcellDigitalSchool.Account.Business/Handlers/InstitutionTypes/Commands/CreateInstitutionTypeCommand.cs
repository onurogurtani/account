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
    [SecuredOperationScope]
    [LogScope]
    public class CreateInstitutionTypeCommand : CreateRequestBase<InstitutionType>
    {
        public class CreateRequestInstitutionTypeCommandHandler : CreateRequestHandlerBase<InstitutionType, CreateInstitutionTypeCommand>
        {
            /// <summary>
            /// Create Institution Type
            /// </summary>
            public CreateRequestInstitutionTypeCommandHandler(IInstitutionTypeRepository ınstitutionTypeRepository) : base(ınstitutionTypeRepository)
            {
            }
        }
    }
}

