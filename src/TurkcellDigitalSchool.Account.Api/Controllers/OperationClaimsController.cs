using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// OperationClaims If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OperationClaimsController : BaseCrudController<OperationClaim>
    {
    }
}
