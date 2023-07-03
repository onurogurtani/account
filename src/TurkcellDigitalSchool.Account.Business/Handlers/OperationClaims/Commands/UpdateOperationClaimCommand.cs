 

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
    public class UpdateOperationClaimCommand : UpdateRequestBase<OperationClaim>
    {
        public class UpdateRequestOperationClaimCommandHandler : UpdateRequestHandlerBase<OperationClaim, UpdateOperationClaimCommand>
        {
            /// <summary>
            /// Update Operation Claim
            /// </summary>
            public UpdateRequestOperationClaimCommandHandler(IOperationClaimRepository operationClaimRepository) : base(operationClaimRepository)
            {
            }
        }
    }
}