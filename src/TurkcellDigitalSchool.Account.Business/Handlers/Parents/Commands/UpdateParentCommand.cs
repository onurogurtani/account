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

    public class UpdateParentCommand : UpdateRequestBase<Parent>
    {
        public class UpdateRequestParentCommandHandler : UpdateRequestHandlerBase<Parent, UpdateParentCommand>
        {
            /// <summary>
            /// Update Parent
            /// </summary>
            public UpdateRequestParentCommandHandler(IParentRepository parentRepository) : base(parentRepository)
            {
            }
        }
    }
}

