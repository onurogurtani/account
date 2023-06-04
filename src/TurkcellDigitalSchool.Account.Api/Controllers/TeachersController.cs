using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Excel.Model;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Teachers If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : BaseApiController
    {

        /// <summary>
        /// Teacher Excel Upload
        /// </summary>
        /// <remarks>TEntity</remarks>
        /// <return>Invalid Records (Excel)</return>
        /// <response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<ExcelResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("uploadTeacherExcel")]
        public async Task<IActionResult> UploadTeacherExcel([FromForm] UploadTeacherExcelCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            if (result.Success)
            {
                return File(result.Data.FileContents, result.Data.ContentType, result.Data.FileDownloadName);
            }

            return BadRequest(result);
        }


        /// <summary>
        /// Teacher Excel Download
        /// </summary>
        /// <remarks>TEntity</remarks>
        /// <return>Teacher Excel Download</return>
        /// <response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("downloadTeacherExcel")]
        public async Task<IActionResult> DownloadTeacherExcel(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new DownloadTeacherExcelCommand(), cancellationToken);
            if (result.Success)
            {
                return File(result.Data.FileContents, result.Data.ContentType, result.Data.FileDownloadName);
            }
            return BadRequest(result);
        }


        ///<summary>
        ///Get Filtered Paged User/Teacher with relation data 
        ///</summary>
        ///<remarks>OrderBy default "UpdateTimeDESC" also can be "NameASC","NameDESC","SurNameASC","SurNameDESC" </remarks>
        ///<return>PagedList Teachers</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<PagedList<GetTeachersResponseDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedTeachers")]
        public async Task<IActionResult> GetByFilterPagedTeachers([FromBody] GetByFilterPagedTeachersQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>TEntity</remarks>
        ///<return>TEntity</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<GetTeacherResponseDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetTeacherQuery { Id = id }, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Set Activate Status Teachers.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("SetActivateStatus")]
        public async Task<IActionResult> SetActivateStatus([FromBody] SetTeacherActivateStatusCommand request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Add TEntity.
        /// </summary>
        /// <param name="addTeacherCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<User>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] AddTeacherCommand addTeacherCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(addTeacherCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }



        /// <summary>
        /// Update TEntity.
        /// </summary>
        /// <param name="updateTeacherCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<User>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateTeacherCommand updateTeacherCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updateTeacherCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        /// Delete TEntity.
        /// </summary>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteTeacherCommand deleteTeacherCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(deleteTeacherCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


    }
}
