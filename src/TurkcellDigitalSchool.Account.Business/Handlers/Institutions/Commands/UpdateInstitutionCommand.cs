using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateInstitutionCommand : UpdateRequestBase<Institution>
    {
        public class UpdateInstitutionCommandHandler : UpdateRequestHandlerBase<Institution>
        {
            /// <summary>
            /// Update Institution
            /// </summary>
            public UpdateInstitutionCommandHandler(IInstitutionRepository ınstitutionRepository) : base(ınstitutionRepository)
            {
            }
        }
    }
}

