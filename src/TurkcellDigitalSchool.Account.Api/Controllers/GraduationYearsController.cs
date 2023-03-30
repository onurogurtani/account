using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// GraduationYears If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class GraduationYearsController : BaseCrudController<GraduationYear>
    {
    }
}
