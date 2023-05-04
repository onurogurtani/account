using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// TargetScreens If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TargetScreensController : BaseApiController
    {

        ///<summary>
        ///Get Filtered Paged TargetScreens with relation data 
        ///</summary>
        ///<remarks>OrderBy default "UpdateTimeDESC" also can be "IsActiveASC","IsActiveDESC","NameASC","NameDESC","PageNameASC","PageNameDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC" 
        ///<br />   PageNumber can be  entered manually </remarks>
        ///<return>PagedList TargetScreens</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PagedList<TargetScreen>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedTargetScreens")]
        public async Task<IActionResult> GetByFilterPagedTargetScreens([FromQuery] GetByFilterPagedTargetScreensQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        ///<summary>
        ///List TEntitys
        ///</summary>
        ///<remarks>TEntitys</remarks>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<TargetScreen>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getList")]
        public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, CancellationToken cancellationToken, [FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] FilterQuery[] filterQuery = null)
        {
            var result = await Mediator.Send(new QueryByFilterRequestBase<TargetScreen> { PaginationQuery = query, FilterQuery = filterQuery }, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<TargetScreen>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] GetTargetScreenQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }





        /// <summary>
        /// Add TEntity.
        /// </summary>
        /// <param name="createTargetScreenCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<TargetScreen>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CreateTargetScreenCommand createTargetScreenCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(createTargetScreenCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Update TEntity.
        /// </summary>
        /// <param name="updateTargetScreenCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<TargetScreen>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateTargetScreenCommand updateTargetScreenCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updateTargetScreenCommand, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<TargetScreen>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteTargetScreenCommand deleteTargetScreenCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(deleteTargetScreenCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }



    }
}
