using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteParentCommand : DeleteRequestBase<Parent>
    {
        public class DeleteParentCommandHandler : DeleteRequestHandlerBase<Parent>
        {
            /// <summary>
            /// Delete Parent
            /// </summary>
            public DeleteParentCommandHandler(IParentRepository repository) : base(repository)
            {
            }
        }
    }
}

