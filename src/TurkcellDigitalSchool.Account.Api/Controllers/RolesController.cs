using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.RoleDtos;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// RoleClaims If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : BaseApiController
    {
        ///<summary>
        ///Get Filtered Paged Role with relation data 
        ///</summary>
        ///<remarks>OrderBy default "UpdateTimeDESC" also can be "NameASC","NameDESC","RecordStatusASC","RecordStatusDESC","IsOrganisationViewASC","IsOrganisationViewDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC","IdASC","IdDESC" </remarks>
        ///<return>PagedList Roles</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PagedList<GetRoleDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedRoles")]
        public async Task<IActionResult> GetByFilterPagedRoles(GetByFilterPagedRolesQuery query)
        {
            var result = await Mediator.Send(query);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Role>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getList")]
        public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, [FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] FilterQuery[] filterQuery = null)
        {
            var result = await Mediator.Send(new QueryByFilterRequestBase<Role> { PaginationQuery = query, FilterQuery = filterQuery });
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<GetRoleDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] GetRoleQuery getRoleQuery)
        {
            var result = await Mediator.Send(getRoleQuery);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Passive Check Control TEntity.
        /// </summary>
        /// <return>TEntity</return>
        /// <response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<Role>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("PassiveCheckControlRole")]
        public async Task<IActionResult> GetById([FromQuery] PassiveCheckControlRoleQuery passiveCheckControlRoleQuery)
        {
            var result = await Mediator.Send(passiveCheckControlRoleQuery);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Set Passive TEntity.
        /// </summary>
        /// <param name="setPassiveRoleCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Role>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("SetPassiveRole")]
        public async Task<IActionResult> Add([FromBody] SetPassiveRoleCommand setPassiveRoleCommand)
        {
            var result = await Mediator.Send(setPassiveRoleCommand);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Set Active Role.
        /// </summary>
        /// <param name="setActiveRoleCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Role>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("SetActiveRole")]
        public async Task<IActionResult> SetActiveRole([FromBody] SetActiveRoleCommand setActiveRoleCommand)
        {
            var result = await Mediator.Send(setActiveRoleCommand);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Copy TEntity.
        /// </summary>
        /// <param name="roleCopyCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("RoleCopy")]
        public async Task<IActionResult> Add([FromBody] RoleCopyCommand roleCopyCommand)
        {
            var result = await Mediator.Send(roleCopyCommand);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Add TEntity.
        /// </summary>
        /// <param name="createRoleCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CreateRoleCommand createRoleCommand)
        {
            var result = await Mediator.Send(createRoleCommand);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Update TEntity.
        /// </summary>
        /// <param name="updateRoleCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateRoleCommand updateRoleCommand)
        {
            var result = await Mediator.Send(updateRoleCommand);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
         

        ///<summary>
        ///Get AdminTypes
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SelectionItem>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getAdminTypes")]
        public async Task<IActionResult> GetAdminTypes()
        {
            var result = await Mediator.Send(new GetAdminTypesQuery());
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<summary>
        ///Get UserTypes
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SelectionItem>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getUserTypes")]
        public async Task<IActionResult> GetUserTypes()
        {
            var result = await Mediator.Send(new GetUserTypesQuery());
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}