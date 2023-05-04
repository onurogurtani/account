using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateSchoolCommand : UpdateRequestBase<School>
    {
        public class UpdateSchoolCommandHandler : UpdateRequestHandlerBase<School>
        {
            /// <summary>
            /// Update School
            /// </summary>
            public UpdateSchoolCommandHandler(ISchoolRepository schoolRepository) : base(schoolRepository)
            {
            }
        }
    }
}

