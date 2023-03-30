using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

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