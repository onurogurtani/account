using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : BaseApiController
    {
        public StudentController()
        {

        }



        /// <summary>
        /// Get Student Package information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<List<PackageInfoDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentPackageInformation")]
        public async Task<IActionResult> GetStudentPackageInformation([FromQuery] GetStudentPackageInformationQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        /// Get Student Parent information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<List<ParentInfoDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentParentInformation")]
        public async Task<IActionResult> GetStudentParentInformation([FromQuery] GetStudentParentInformationQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
       
      

        /// <summary>
        /// Get Student Parents information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<List<ParentInfoDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentParentsInformation")]
        public async Task<IActionResult> GetStudentParentsInformation([FromQuery] GetStudentParentsInformationQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Get Students By Parent CitizenId
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<List<ParentInfoDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentsByParentCitizenId")]
        public async Task<IActionResult> GetStudentsByParentCitizenId([FromQuery] GetStudentsByParentCitizenIdQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Get Students By Parent Id
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<List<ParentInfoDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentsByParentId")]
        public async Task<IActionResult> GetStudentsByParentId([FromQuery] GetStudentsByParentIdQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Get Parent Information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<List<ParentInfoDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetParentInformation")]
        public async Task<IActionResult> GetParentInformation(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetParentInformationQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Update Student Access To Chat
        /// </summary>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("UpdateStudentAccessToChat")]
        public async Task<IActionResult> UpdateStudentAccessToChat([FromBody] UpdateStudentAccessToChatCommand request, CancellationToken cancellationToken)
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
