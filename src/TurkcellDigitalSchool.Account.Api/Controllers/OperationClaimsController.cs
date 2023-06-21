using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// OperationClaims If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OperationClaimsController : BaseCrudController<OperationClaim, GetOperationClaimsQuery, GetOperationClaimQuery, CreateOperationClaimCommand, UpdateOperationClaimCommand, DeleteOperationClaimCommand>
    {
    }
}
