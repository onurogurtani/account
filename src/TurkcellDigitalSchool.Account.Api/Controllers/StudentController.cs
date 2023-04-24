using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

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
        /// Get Student Parent information
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ParentInfoDto</returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<ParentInfoDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetStudentParentInformation")]
        public async Task<IActionResult> GetStudentParentInformation([FromQuery] GetStudentParentInformationQuery request)
        {
            var result = await Mediator.Send(request);
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
        public async Task<IActionResult> GetStudentEducationInformation([FromQuery] GetStudentEducationInformationQuery request)
        {
            var result = await Mediator.Send(request);
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
        public async Task<IActionResult> UpdateStudentEducationInformation([FromBody] UpdateStudentEducationInformationCommand request)
        {
            var result = await Mediator.Send(request);
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
        public async Task<IActionResult> GetStudentPersonalInformation([FromQuery] GetStudentPersonalInformationQuery request)
        {
            var result = await Mediator.Send(request);
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
        public async Task<IActionResult> UpdateStudentPersonalInformation([FromBody] UpdateStudentPersonalInformationCommand request)
        {
            var result = await Mediator.Send(request);
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
        public async Task<IActionResult> UpdateStudentEmailInformation([FromBody] UpdateStudentEmailCommand request)
        {
            var result = await Mediator.Send(request);
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
        public async Task<IActionResult> UpdateStudentVerifyMobilPhone([FromBody] UpdateStudentVerifyMobilPhoneCommand request)
        {
            var result = await Mediator.Send(request);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


    }
}
