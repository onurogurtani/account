using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Commands
{
    [ExcludeFromCodeCoverage]  
    [LogScope]
    public class DeleteInstitutionCommand : DeleteRequestBase<Institution>
    {
        public class DeleteRequestInstitutionCommandHandler : DeleteRequestHandlerBase<Institution, DeleteInstitutionCommand>
        {
            /// <summary>
            /// Delete Institution
            /// </summary>
            public DeleteRequestInstitutionCommandHandler(IInstitutionRepository repository) : base(repository)
            {
            }
        }
    }
}

