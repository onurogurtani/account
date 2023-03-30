using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Commands
{
    /// <summary>
    /// Update Education
    /// </summary>

    [ExcludeFromCodeCoverage]
    public class UpdateEducationCommand : UpdateRequestBase<Education>
    {
        public class UpdateEducationCommandHandler : UpdateRequestHandlerBase<Education>
        {
            public UpdateEducationCommandHandler(IEducationRepository educationRepository) : base(educationRepository)
            {
            }
        }
    }
}

