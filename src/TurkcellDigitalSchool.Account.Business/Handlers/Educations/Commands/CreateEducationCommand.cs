using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Commands
{
    /// <summary>
    /// Create Education
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class CreateEducationCommand : CreateRequestBase<Education>
    {
        public class CreateEducationCommandHandler : CreateRequestHandlerBase<Education>
        {
            public CreateEducationCommandHandler(IEducationRepository educationRepository) : base(educationRepository)
            {
            }
        }
    }
}

