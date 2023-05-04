using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteSchoolCommand : DeleteRequestBase<School>
    {
        public class DeleteSchoolCommandHandler : DeleteRequestHandlerBase<School>
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

