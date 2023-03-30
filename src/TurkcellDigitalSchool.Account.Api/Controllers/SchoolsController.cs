using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Schools.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Schools If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolsController : BaseCrudController<School>
    {

        ///<summary>
        ///List TEntitys
        ///</summary>
        ///<remarks>TEntitys</remarks>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<School>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getPagedList")]
        public async Task<IActionResult> GetPagedList([FromQuery] PaginationQuery query, [FromBody] GetSchoolListQuery.SchoolDto filter = null)
        {
            var result = await Mediator.Send(new GetSchoolListQuery { PaginationQuery = query, QueryDto = filter });
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// School Excel Upload
        /// </summary>
        /// <remarks>TEntity</remarks>
        /// <return>School Excel Upload</return>
        /// <response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("uploadSchoolExcel")]
        public async Task<IActionResult> UploadSchoolExcel([FromForm] UploadSchoolExcelCommand command)
        {
            var result = await Mediator.Send(command);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// School Excel Download
        /// </summary>
        /// <remarks>TEntity</remarks>
        /// <return>School Excel Download</return>
        /// <response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("downloadSchoolExcel")]
        public async Task<IActionResult> DownloadSchoolExcel()
        {
            var result = await Mediator.Send(new DownloadSchoolExcelCommand());
            if (result.Success)
            {
                return File(result.Data.FileContents, result.Data.ContentType, result.Data.FileDownloadName);
            }
            return BadRequest(result);
        }
    }
}
