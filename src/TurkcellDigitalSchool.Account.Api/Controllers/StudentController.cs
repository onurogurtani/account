using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Controllers;
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<StudentInfoDto>))]
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PackageInfoDto>))]
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<ParentInfoDto>))]
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
        /// Get Student Education information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>EducationInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<EducationInfoDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentEducationInformation")]
        public async Task<IActionResult> GetStudentEducationInformation([FromQuery] GetStudentEducationInformationQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// student education information add/update
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateStudentEducationInformation")]
        public async Task<IActionResult> UpdateStudentEducationInformation([FromBody] UpdateStudentEducationInformationCommand request, CancellationToken cancellationToken)
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PersonalInfoDto>))]
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
        /// Get Student Settings information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>PersonalInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<SettingsInfoDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentSettingsInformation")]
        public async Task<IActionResult> GetStudentSettingsInformation([FromQuery] GetStudentSettingsInformationQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// student Communication Preferences information update
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateStudentCommunicationPreferences")]
        public async Task<IActionResult> UpdateStudentCommunicationPreferences([FromBody] UpdateStudentCommunicationPreferencesCommand request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Student Support Team View My Data  information update
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateStudentSupportTeamViewMyData")]
        public async Task<IActionResult> UpdateStudentSupportTeamViewMyData([FromBody] UpdateStudentSupportTeamViewMyDataCommand request, CancellationToken cancellationToken)
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
        /// student mobile phone verification
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateStudentVerifyMobilPhone")]
        public async Task<IActionResult> UpdateStudentVerifyMobilPhone([FromBody] UpdateStudentVerifyMobilPhoneCommand request, CancellationToken cancellationToken)
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
