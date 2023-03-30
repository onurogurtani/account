using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateInstitutionTypeCommand : CreateRequestBase<InstitutionType>
    {
        public class CreateInstitutionTypeCommandHandler : CreateRequestHandlerBase<InstitutionType>
        {
            /// <summary>
            /// Create Institution Type
            /// </summary>
            public CreateInstitutionTypeCommandHandler(IInstitutionTypeRepository ınstitutionTypeRepository) : base(ınstitutionTypeRepository)
            {
            }
        }
    }
}

