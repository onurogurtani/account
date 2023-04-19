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

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateStudentParentInformation")]
        public async Task<IActionResult> UpdateStudentParentInformation([FromBody] UpdateStudentParentInformationCommand request)
        {
            var result = await Mediator.Send(request);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

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

    }
}
