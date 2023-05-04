using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Packages If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : BaseApiController
    {

        ///<summary>
        ///Get Packages For User with relation data 
        ///</summary>
        ///<return>PagedList Packages</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PagedList<GetPackagesForUserResponseDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getPackagesForUser")]
        public async Task<IActionResult> GetPackagesForUser([FromBody] PaginationQuery pagination, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetPackagesForUserQuery { Pagination=pagination}, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<GetPackageForUserResponseDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyidforuser")]
        public async Task<IActionResult> GetPackageForUser(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetPackageForUserQuery { Id=id}, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<summary>
        ///Get Names all of Packages
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<string>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getPackageNames")]
        public async Task<IActionResult> GetPackageNames(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetPackageNamesQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        ///<summary>
        ///Get Filtered Paged Packages with relation data 
        ///</summary>
        ///<remarks>OrderBy default "UpdateTimeDESC" also can be "IsActiveASC","IsActiveDESC","NameASC","NameDESC","PackageKindASC","PackageKindDESC","SummaryASC","SummaryDESC","ContentASC","ContentDESC","PackageTypeASC","PackageTypeDESC","MaxNetCountASC","MaxNetCountDESC","ClassroomDESC","ClassroomASC","LessonDESC","LessonASC","PackageFieldTypeASC","PackageFieldTypeDESC","RoleDESC","RoleASC","StartDateASC","StartDateDESC","FinishDateASC","FinishDateDESC","HasCoachServiceASC","HasCoachServiceDESC","HasTryingTestASC","HasTryingTestDESC","TryingTestQuestionCountASC","TryingTestQuestionCountDESC","HasMotivationEventASC","HasMotivationEventDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC"  </remarks>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PagedList<Package>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedPackages")]
        public async Task<IActionResult> GetByFilterPagedPackages([FromQuery] GetByFilterPagedPackagesQuery query, CancellationToken cancellationToken)
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Package>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getList")]
        public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, CancellationToken cancellationToken, [FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] FilterQuery[] filterQuery = null)
        {
            var result = await Mediator.Send(new QueryByFilterRequestBase<Package> { PaginationQuery = query, FilterQuery = filterQuery }, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<Package>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] GetPackageQuery query, CancellationToken cancellationToken)
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
        /// <param name="createPackageCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Package>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CreatePackageCommand createPackageCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(createPackageCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Update TEntity.
        /// </summary>
        /// <param name="updatePackageCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Package>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdatePackageCommand updatePackageCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updatePackageCommand, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Package>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeletePackageCommand deletePackageCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(deletePackageCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }



    }
}
