 

using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Queries
{
    [ExcludeFromCodeCoverage] 
    [SecuredOperation]
    [LogScope]
    public class GetOperationClaimQuery : QueryByIdRequestBase<OperationClaim>
    {
        public class GetOperationClaimQueryHandler : QueryByIdBase<OperationClaim, GetOperationClaimQuery>
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