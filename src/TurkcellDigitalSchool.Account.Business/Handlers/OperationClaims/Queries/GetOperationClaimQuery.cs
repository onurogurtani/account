 

using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Queries
{
    [ExcludeFromCodeCoverage]  
    [LogScope]
    public class GetOperationClaimQuery : QueryByIdRequestBase<OperationClaim>
    {
        public class GetOperationClaimQueryHandler : QueryByIdRequestHandlerBase<OperationClaim, GetOperationClaimQuery>
        {
            /// <summary>
            /// Get Operation Claim
            /// </summary>
            public GetOperationClaimQueryHandler(IOperationClaimRepository operationClaimRepository) : base(operationClaimRepository)
            {
            }
        }
    }
}