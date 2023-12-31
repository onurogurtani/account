using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OrganisationChangeRequestController : BaseApiController
    {
        ///<summary>
        ///Get Filtered Paged Organisation Info Change Request with relation data 
        ///</summary>
        ///<remarks>OrderBy default "UpdateTimeDESC" also can be ""RequestDateASC" ,"RequestDateDESC",  "RequestStateASC","RequestStateDESC", "ResponseStateASC" , "ResponseStateDESC", "CustomerManagerASC", "CustomerManagerDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC","IdASC","IdDESC" </remarks>
        ///<return>PagedList GetOrganisationInfoChangeRequestDto</return>               
        ///<response code="200"></response>                      
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<PagedList<GetOrganisationInfoChangeRequestDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedOrganisationChangeRequests")]
        public async Task<IActionResult> GetByFilterPagedOrganisationChangeRequests(GetByFilterPagedOrganisationChangeRequestQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /////<summary>
        /////List TEntitys
        /////</summary>
        /////<remarks>TEntitys</remarks>
        /////<return>List TEntitys</return>
        /////<response code="200"></response>
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<OrganisationInfoChangeRequest>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPost("getList")]
        //public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, CancellationToken cancellationToken, [FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] FilterQuery[] filterQuery = null)
        //{
        //    var result = await Mediator.Send(new GetByFilterPagedOrganisationChangeRequestQuery { PaginationQuery = query, FilterQuery = filterQuery }, cancellationToken);
        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }
        //    return BadRequest(result);
        //}



        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>TEntity</remarks>
        ///<return>TEntity</return>
        ///<response code = "200" ></ response >
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<GetOrganisationInfoChangeRequestDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] GetOrganisationChangeRequestByIdQuery getOrganisationChangeRequestByIdQuery, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(getOrganisationChangeRequestByIdQuery, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Add TEntity.
        /// </summary>
        /// <param name="createOrganisationChangeRequestCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<OrganisationInfoChangeRequest>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromHeader(Name = "CurrentOrganisationId")] long CurrentOrganisationId, [FromBody] CreateOrganisationChangeRequestCommand createOrganisationChangeRequestCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(createOrganisationChangeRequestCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Update TEntity.
        /// </summary>
        /// <param name="updateOrganisationCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<OrganisationInfoChangeRequest>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromHeader(Name = "CurrentOrganisationId")] long CurrentOrganisationId, [FromBody] UpdateOrganisationChangeRequestCommand updateOrganisationChangeRequestCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updateOrganisationChangeRequestCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

       
        /// <summary>
        /// Delete Video Attachments
        /// </summary>
        /// <param name="deleteOrganisationChangeRequestCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteOrganisationChangeRequestCommand deleteOrganisationChangeRequestCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(deleteOrganisationChangeRequestCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

    }
}
