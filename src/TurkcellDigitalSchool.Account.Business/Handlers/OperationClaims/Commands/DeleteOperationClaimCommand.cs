 

using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Commands
{
    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class DeleteOperationClaimCommand : DeleteRequestBase<OperationClaim>
    {
        public class DeleteRequestOperationClaimCommandHandler : DeleteRequestHandlerBase<OperationClaim, DeleteOperationClaimCommand>
        {
            /// <summary>
            /// Delete Operation Claim
            /// </summary>
            public DeleteRequestOperationClaimCommandHandler(IOperationClaimRepository repository) : base(repository)
            {
            }
        }
    }
}