using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateInstitutionCommand : CreateRequestBase<Institution>
    {
        public class CreateInstitutionCommandHandler : CreateRequestHandlerBase<Institution>
        {

            /// <summary>
            /// Create Institution
            /// </summary>
            public CreateInstitutionCommandHandler(IInstitutionRepository ınstitutionRepository) : base(ınstitutionRepository)
            {
            }
        }
    }
}

