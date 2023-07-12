﻿using Microsoft.AspNetCore.Http;
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
        /// Get Student information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<UserProfileInfoDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentInformations")]
        public async Task<IActionResult> GetStudentInformations([FromQuery] GetStudentInformationsQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
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
        /// Get Student Personal information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>PersonalInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<PersonalInfoDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentPersonalInformation")]
        public async Task<IActionResult> GetStudentPersonalInformation([FromQuery] GetStudentPersonalInformationQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// student personal information add/update
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateStudentPersonalInformation")]
        public async Task<IActionResult> UpdateStudentPersonalInformation([FromBody] UpdateStudentPersonalInformationCommand request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// student email information update
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateStudentEmailInformation")]
        public async Task<IActionResult> UpdateStudentEmailInformation([FromBody] UpdateStudentEmailCommand request, CancellationToken cancellationToken)
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


        

    }
}
