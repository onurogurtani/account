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
    /// Update Education
    /// </summary>

    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class UpdateEducationCommand : UpdateRequestBase<Education>
    {
        public class UpdateRequestEducationCommandHandler : UpdateRequestHandlerBase<Education, UpdateEducationCommand>
        {
            public UpdateRequestEducationCommandHandler(IEducationRepository educationRepository) : base(educationRepository)
            {
            }
        }
    }
}

