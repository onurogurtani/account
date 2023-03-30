using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateParentCommand : CreateRequestBase<Parent>
    {
        public class CreateParentCommandHandler : CreateRequestHandlerBase<Parent>
        {
            /// <summary>
            /// Create Parent
            /// </summary>
            public CreateParentCommandHandler(IParentRepository parentRepository) : base(parentRepository)
            {
            }
        }
    }
}

