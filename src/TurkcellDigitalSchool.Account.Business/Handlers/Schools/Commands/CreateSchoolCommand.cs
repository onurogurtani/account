using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateSchoolCommand : CreateRequestBase<School>
    {
        public class CreateSchoolCommandHandler : CreateRequestHandlerBase<School>
        {
            /// <summary>
            /// Create School
            /// </summary>
            public CreateSchoolCommandHandler(ISchoolRepository schoolRepository) : base(schoolRepository)
            {
            }
        }
    }
}

