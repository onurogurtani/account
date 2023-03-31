using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateOperationClaimCommand : CreateRequestBase<OperationClaim>
    {
        public class CreateOperationClaimCommandHandler : CreateRequestHandlerBase<OperationClaim>
        {
            /// <summary>
            /// Create Operation Claim
            /// </summary>
            public CreateOperationClaimCommandHandler(IOperationClaimRepository operationClaimRepository) : base(operationClaimRepository)
            {
            }
        }
    }
}