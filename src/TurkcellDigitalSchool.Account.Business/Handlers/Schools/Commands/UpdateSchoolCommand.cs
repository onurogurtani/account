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

    public class UpdateSchoolCommand : UpdateRequestBase<School>
    {
        public class UpdateSchoolCommandHandler : UpdateHandlerBase<School, UpdateSchoolCommand>
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

