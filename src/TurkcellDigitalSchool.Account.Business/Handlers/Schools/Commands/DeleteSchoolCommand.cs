using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class DeleteSchoolCommand : DeleteRequestBase<School>
    {
        public class DeleteSchoolCommandHandler : DeleteHandlerBase<School, DeleteSchoolCommand>
        {
            /// <summary>
            /// Delete School
            /// </summary>
            public DeleteSchoolCommandHandler(ISchoolRepository repository) : base(repository)
            {
            }
        }
    }
}

