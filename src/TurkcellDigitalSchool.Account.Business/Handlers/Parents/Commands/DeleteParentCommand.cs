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

    public class DeleteParentCommand : DeleteRequestBase<TurkcellDigitalSchool.Account.Domain.Concrete.Parent>
    {
        public class DeleteRequestParentCommandHandler : DeleteRequestHandlerBase<TurkcellDigitalSchool.Account.Domain.Concrete.Parent, DeleteParentCommand>
        {
            /// <summary>
            /// Delete Parent
            /// </summary>
            public DeleteRequestParentCommandHandler(IParentRepository repository) : base(repository)
            {
            }
        }
    }
}

