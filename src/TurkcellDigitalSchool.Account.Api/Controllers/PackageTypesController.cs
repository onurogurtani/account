using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// PackageTypes If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PackageTypesController : BaseApiController
    {

        ///<summary>
        ///Get Filtered Paged PackageTypes with relation data 
        ///</summary>
        ///<remarks>OrderBy default "UpdateTimeDESC" also can be "IsActiveASC","IsActiveDESC","NameASC","NameDESC","PackageTypeASC","PackageTypeDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC" 
        ///<br />   PageNumber can be  entered manually </remarks>
        ///<return>PagedList PackageTypes</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PagedList<PackageType>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedPackageTypes")]
        public async Task<IActionResult> GetByFilterPagedPackageTypes([FromQuery] GetByFilterPagedPackageTypesQuery query, CancellationToken cancellationToken)
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PackageType>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getList")]
        public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, CancellationToken cancellationToken, [FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] FilterQuery[] filterQuery = null)
        {
            var result = await Mediator.Send(new QueryByFilterRequestBase<PackageType> { PaginationQuery = query, FilterQuery = filterQuery }, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PackageType>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] GetPackageTypeQuery query, CancellationToken cancellationToken)
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
        /// <param name="createPackageTypeCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<PackageType>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CreatePackageTypeCommand createPackageTypeCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(createPackageTypeCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Update TEntity.
        /// </summary>
        /// <param name="updatePackageTypeCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<PackageType>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdatePackageTypeCommand updatePackageTypeCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updatePackageTypeCommand, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<PackageType>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeletePackageTypeCommand deletePackageTypeCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(deletePackageTypeCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }



    }
}
