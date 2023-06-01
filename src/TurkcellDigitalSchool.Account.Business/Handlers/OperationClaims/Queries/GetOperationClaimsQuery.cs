 

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
    public class GetOperationClaimsQuery : QueryByFilterRequestBase<OperationClaim>
    {
        public class GetOperationClaimsQueryHandler : QueryByFilterBase<OperationClaim, GetOperationClaimsQuery>
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