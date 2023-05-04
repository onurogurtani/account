using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateParentCommand : UpdateRequestBase<Parent>
    {
        public class UpdateParentCommandHandler : UpdateRequestHandlerBase<Parent>
        {
            /// <summary>
            /// Update Parent
            /// </summary>
            public UpdateParentCommandHandler(IParentRepository parentRepository) : base(parentRepository)
            {
            }
        }
    }
}

