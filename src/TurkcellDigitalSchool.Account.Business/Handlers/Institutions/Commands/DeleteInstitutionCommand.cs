using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteInstitutionCommand : DeleteRequestBase<Institution>
    {
        public class DeleteInstitutionCommandHandler : DeleteRequestHandlerBase<Institution>
        {
            /// <summary>
            /// Delete Institution
            /// </summary>
            public DeleteInstitutionCommandHandler(IInstitutionRepository repository) : base(repository)
            {
            }
        }
    }
}

