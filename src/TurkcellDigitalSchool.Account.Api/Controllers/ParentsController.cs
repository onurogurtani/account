using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Parents If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ParentsController : BaseCrudController<Parent, GetParentsQuery, GetParentQuery, CreateParentCommand, UpdateParentCommand, DeleteParentCommand>
    {
        ///<summary>
        ///Get ByStudentUserId Parent
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Parent))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getByStudentUserIdParent")]
        public async Task<IActionResult> GetByStudentUserIdParent([FromQuery] GetByStudentUserIdParentQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Get Student Package information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<List<PackageInfoDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetParentPackageInformation")]
        public async Task<IActionResult> GetParentPackageInformation([FromQuery] GetParentPackageInformationQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
