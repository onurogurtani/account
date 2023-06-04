using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Commands
{
    /// <summary>
    /// Create Education
    /// </summary>
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class CreateEducationCommand : CreateRequestBase<Education>
    {
        public class CreateRequestEducationCommandHandler : CreateRequestHandlerBase<Education, CreateEducationCommand>
        {
            public CreateRequestEducationCommandHandler(IEducationRepository educationRepository) : base(educationRepository)
            {
            }
        }
    }
}

