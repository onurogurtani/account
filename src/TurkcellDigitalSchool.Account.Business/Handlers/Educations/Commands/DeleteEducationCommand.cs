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
    /// Delete Education
    /// </summary>
    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class DeleteEducationCommand : DeleteRequestBase<Education>
    {
        public class DeleteRequestEducationCommandHandler : DeleteRequestHandlerBase<Education, DeleteEducationCommand>
        {
            public DeleteRequestEducationCommandHandler(IEducationRepository repository) : base(repository)
            {
            }
        }
    }
}

