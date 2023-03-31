using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOperationClaimQuery : QueryByIdRequestBase<OperationClaim>
    {
        public class GetOperationClaimQueryHandler : QueryByIdRequestHandlerBase<OperationClaim>
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