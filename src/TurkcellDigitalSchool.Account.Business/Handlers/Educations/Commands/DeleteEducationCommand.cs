using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Commands
{
    /// <summary>
    /// Delete Education
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class DeleteEducationCommand : DeleteRequestBase<Education>
    {
        public class DeleteEducationCommandHandler : DeleteRequestHandlerBase<Education>
        {
            public DeleteEducationCommandHandler(IEducationRepository repository) : base(repository)
            {
            }
        }
    }
}

