using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Institutions If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionsController : BaseCrudController<Institution>
    {
    }
}
