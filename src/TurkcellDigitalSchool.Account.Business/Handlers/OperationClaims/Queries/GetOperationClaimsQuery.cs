 

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

    [SecuredOperationScope]
    [LogScope]
    public class GetOperationClaimsQuery : QueryByFilterRequestBase<OperationClaim>
    {
        public class GetOperationClaimsQueryHandler : QueryByFilterRequestHandlerBase<OperationClaim, GetOperationClaimsQuery>
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