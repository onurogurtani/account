using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Queries;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// FrameFiles If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AvatarFilesController : BaseApiController
    {
        /// <summary>
        /// Add image
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain", "multipart/from-data")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] CreateAvatarFileCommand data, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(data, cancellationToken);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result.Message);
        }

        /// <summary>
        ///  Update image
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut]
        public async Task<IActionResult> Update([FromForm] UpdateAvatarFileCommand data, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(data, cancellationToken);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result.Message);
        }


        /// <summary>
        /// Delete TEntity.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteAvatarFileCommand data, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(data, cancellationToken);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result.Message);
        }

        /// <summary>
        /// List TEntitys
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<AvatarFilesDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getList")]
        public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetAvatarFilesQuery { PaginationQuery = query }, cancellationToken);

            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        /// <summary>
        /// It brings the file 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(byte[]))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetAvatarFileQuery { Id = id }, cancellationToken);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return File(result.Data.Image, result.Data.ContentType, result.Data.FileName);
        }

        /// <summary>
        /// It brings the file base64 string
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(byte[]))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getBase64")]
        public async Task<IActionResult> GetBase64(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetAvatarFileQuery { Id = id }, cancellationToken);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

    }
}
