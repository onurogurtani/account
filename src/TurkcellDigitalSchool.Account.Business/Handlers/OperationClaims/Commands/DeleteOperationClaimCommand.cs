using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteOperationClaimCommand : DeleteRequestBase<OperationClaim>
    {
        public class DeleteOperationClaimCommandHandler : DeleteRequestHandlerBase<OperationClaim>
        {
            /// <summary>
            /// Delete Operation Claim
            /// </summary>
            public DeleteOperationClaimCommandHandler(IOperationClaimRepository repository) : base(repository)
            {
            }
        }
    }
}