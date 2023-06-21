using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]

    public class CreateParentCommand : CreateRequestBase<Parent>
    {
        public class CreateRequestParentCommandHandler : CreateRequestHandlerBase<Parent, CreateParentCommand>
        {
            /// <summary>
            /// Create Parent
            /// </summary>
            public CreateRequestParentCommandHandler(IParentRepository parentRepository) : base(parentRepository)
            {
            }
        }
    }
}

