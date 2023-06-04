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
    public class CreateInstitutionCommand : CreateRequestBase<Institution>
    {
        public class CreateRequestInstitutionCommandHandler : CreateRequestHandlerBase<Institution, CreateInstitutionCommand>
        {

            /// <summary>
            /// Create Institution
            /// </summary>
            public CreateRequestInstitutionCommandHandler(IInstitutionRepository ınstitutionRepository) : base(ınstitutionRepository)
            {
            }
        }
    }
}

