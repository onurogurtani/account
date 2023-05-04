using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateInstitutionTypeCommand : UpdateRequestBase<InstitutionType>
    {
        public class UpdateInstitutionTypeCommandHandler : UpdateRequestHandlerBase<InstitutionType>
        {
            /// <summary>
            /// Update Institution Type
            /// </summary>
            public UpdateInstitutionTypeCommandHandler(IInstitutionTypeRepository ınstitutionTypeRepository) : base(ınstitutionTypeRepository)
            {
            }
        }
    }
}

