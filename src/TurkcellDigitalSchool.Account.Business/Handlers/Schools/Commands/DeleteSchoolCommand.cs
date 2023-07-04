using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers; 
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.SchoolManagementDelete })]
    [LogScope]
    public class DeleteSchoolCommand : DeleteRequestBase<School>
    {
        public class DeleteRequestSchoolCommandHandler : DeleteRequestHandlerBase<School, DeleteSchoolCommand>
        {
            /// <summary>
            /// Delete School
            /// </summary>
            public DeleteRequestSchoolCommandHandler(ISchoolRepository repository) : base(repository)
            {
            }
        }
    }
}

