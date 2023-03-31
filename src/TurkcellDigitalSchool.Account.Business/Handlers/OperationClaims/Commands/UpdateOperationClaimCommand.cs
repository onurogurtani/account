using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateOperationClaimCommand : UpdateRequestBase<OperationClaim>
    {
        public class UpdateOperationClaimCommandHandler : UpdateRequestHandlerBase<OperationClaim>
        {
            /// <summary>
            /// Update Operation Claim
            /// </summary>
            public UpdateOperationClaimCommandHandler(IOperationClaimRepository operationClaimRepository) : base(operationClaimRepository)
            {
            }
        }
    }
}