 
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
    [SecuredOperationScope]
    [LogScope]
    public class CreateOperationClaimCommand : CreateRequestBase<OperationClaim>
    {
        public class CreateRequestOperationClaimCommandHandler : CreateRequestHandlerBase<OperationClaim, CreateOperationClaimCommand>
        {
            /// <summary>
            /// Create Operation Claim
            /// </summary>
            public CreateRequestOperationClaimCommandHandler(IOperationClaimRepository operationClaimRepository) : base(operationClaimRepository)
            {
            }
        }
    }
}