using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOperationClaimsQuery : QueryByFilterRequestBase<OperationClaim>
    {
        public class GetOperationClaimsQueryHandler : QueryByFilterRequestHandlerBase<OperationClaim>
        {
            /// <summary>
            /// Get Operation Claims
            /// </summary>
            public GetOperationClaimsQueryHandler(IOperationClaimRepository repository) : base(repository)
            {
            }
        }
    }
}