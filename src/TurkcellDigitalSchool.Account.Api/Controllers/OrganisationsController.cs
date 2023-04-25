using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationDtos;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationUserDtos;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Organisations If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OrganisationsController : BaseApiController
    {
        ///<summary>
        ///Get Filtered Paged Organisation with relation data 
        ///</summary>
        ///<remarks>OrderBy default "UpdateTimeDESC" also can be ""CrmIdASC","CrmIdDESC","OrganisationTypeNameASC","OrganisationTypeNameDESC",NameASC","NameDESC","OrganisationManagerASC","OrganisationManagerDESC","PackageNameASC","PackageNameDESC","LicenceNumberASC","LicenceNumberDESC","DomainNameASC","DomainNameDESC","CustomerNumberASC","CustomerNumberDESC","OrganisationStatusInfoASC","OrganisationStatusInfoDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC","IdASC","IdDESC" </remarks>
        ///<return>PagedList Organisations</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PagedList<Organisation>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedOrganisations")]
        public async Task<IActionResult> GetByFilterPagedOrganisations(GetByFilterPagedOrganisationsQuery query, CancellationToken cancellationToken)
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Organisation>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getList")]
        public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, CancellationToken cancellationToken, [FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] FilterQuery[] filterQuery = null)
        {
            var result = await Mediator.Send(new QueryByFilterRequestBase<Organisation> { PaginationQuery = query, FilterQuery = filterQuery }, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<OrganisationDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] GetOrganisationQuery getOrganisationQuery, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(getOrganisationQuery, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<summary>
        ///Get Organisation Names
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SelectionItem>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getOrganisationNames")]
        public async Task<IActionResult> GetOrganisationNames(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetOrganisationNamesQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<summary>
        ///Get Organisation Package Names
        ///</summary>
        ///<remarks>Get PackageId and PackageNames in Organisation</remarks>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SelectionItem>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getOrganisationPackageNames")]
        public async Task<IActionResult> GetOrganisationPackageNames(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetOrganisationPackageNamesQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<summary>
        ///Get Organisation Manager Names
        ///</summary>
        ///<remarks>Get OrganisationId and OrganisationManagerNames in Organisation</remarks>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SelectionItem>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getOrganisationManagerNames")]
        public async Task<IActionResult> GetOrganisationManagerNames(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetOrganisationManagerNamesQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<summary>
        ///Get Organisation Domain Names
        ///</summary>
        ///<remarks>Get OrganisationId and OrganisationDomainNames in Organisation</remarks>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SelectionItem>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getOrganisationDomainNames")]
        public async Task<IActionResult> GetOrganisationDomainNames(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetOrganisationDomainNamesQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Add TEntity.
        /// </summary>
        /// <param name="createOrganisationCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Organisation>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CreateOrganisationCommand createOrganisationCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(createOrganisationCommand, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Organisation>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateOrganisationCommand updateOrganisationCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updateOrganisationCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Update Organisation Status parameter.
        /// </summary>
        /// <param name="updateOrganisationStatusCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Organisation>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateOrganisationStatus")]
        public async Task<IActionResult> Update([FromBody] UpdateOrganisationStatusCommand updateOrganisationStatusCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updateOrganisationStatusCommand, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Organisation>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new DeleteRequestBase<Organisation> { Id = id }, cancellationToken);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<OrganisationUsersDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetOrganisationByUserIdQuery")]
        public async Task<IActionResult> GetOrganisationByUserIdQuery([FromQuery] GetOrganisationByUserIdQuery getOrganisationUserQuery, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(getOrganisationUserQuery, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<OrganisationUserDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetUserOrganisationInfoByOrganisationIdQuery")]
        public async Task<IActionResult> GetUserOrganisationInfoByOrganisationIdQuery([FromQuery] GetUserOrganisationInfoByOrganisationIdQuery getUserOrganisationInfoByOrganisationIdQuery, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(getUserOrganisationInfoByOrganisationIdQuery, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
