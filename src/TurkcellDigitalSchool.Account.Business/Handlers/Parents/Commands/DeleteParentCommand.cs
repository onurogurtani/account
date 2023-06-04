using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]

    public class DeleteParentCommand : DeleteRequestBase<Parent>
    {
        public class DeleteRequestParentCommandHandler : DeleteRequestHandlerBase<Parent, DeleteParentCommand>
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

