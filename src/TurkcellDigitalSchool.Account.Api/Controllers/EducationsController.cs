using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Educations.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Educations If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class EducationsController : BaseCrudController<Education>
    {

        ///<summary>
        ///Get By User Id Education
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Education))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getByUserIdEducation")]
        public async Task<IActionResult> GetByUserIdEducation([FromQuery] GetByUserIdEducationQuery query)
        {
            var result = await Mediator.Send(query);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

    }
}
