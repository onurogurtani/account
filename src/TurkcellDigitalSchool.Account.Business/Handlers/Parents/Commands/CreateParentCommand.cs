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
     
    [LogScope]

    public class CreateParentCommand : CreateRequestBase<TurkcellDigitalSchool.Account.Domain.Concrete.Parent>
    {
        public class CreateRequestParentCommandHandler : CreateRequestHandlerBase<TurkcellDigitalSchool.Account.Domain.Concrete.Parent, CreateParentCommand>
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

