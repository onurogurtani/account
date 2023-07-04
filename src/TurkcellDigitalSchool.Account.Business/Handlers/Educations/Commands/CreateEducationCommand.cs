using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Commands
{
    /// <summary>
    /// Create Education
    /// </summary>
    [ExcludeFromCodeCoverage] 
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

