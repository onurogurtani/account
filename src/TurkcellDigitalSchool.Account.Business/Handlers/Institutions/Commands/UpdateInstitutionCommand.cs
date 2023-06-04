using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Commands
{
    [ExcludeFromCodeCoverage] 
    [SecuredOperation]
    [LogScope]
    public class UpdateInstitutionCommand : UpdateRequestBase<Institution>
    {
        public class UpdateRequestInstitutionCommandHandler : UpdateRequestHandlerBase<Institution, UpdateInstitutionCommand>
        {
            /// <summary>
            /// Update Institution
            /// </summary>
            public UpdateRequestInstitutionCommandHandler(IInstitutionRepository ınstitutionRepository) : base(ınstitutionRepository)
            {
            }
        }
    }
}

