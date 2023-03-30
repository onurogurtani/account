using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Dtos.StudentAnswerTargetRangeDtos;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAnswerTargetRangeController : BaseApiController
    {
        public StudentAnswerTargetRangeController()
        {

        }

        /// <summary>
        /// Add StudentAnswerTargetRange
        /// </summary>
        /// <param name="createStudentAnswerTargetRangeCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CreateStudentAnswerTargetRangeCommand createStudentAnswerTargetRangeCommand)
        {
            var result = await Mediator.Send(createStudentAnswerTargetRangeCommand);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        /// <summary>
        /// Update StudentAnswerTargetRange
        /// </summary>
        /// <param name="updateStudentAnswerTargetRangeCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateStudentAnswerTargetRangeCommand updateStudentAnswerTargetRangeCommand)
        {
            var result = await Mediator.Send(updateStudentAnswerTargetRangeCommand);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        /// <summary>
        /// Delete StudentAnswerTargetRange
        /// </summary>
        /// <param name="deleteStudentAnswerTargetRangeCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteStudentAnswerTargetRangeCommand deleteStudentAnswerTargetRangeCommand)
        {
            var result = await Mediator.Send(deleteStudentAnswerTargetRangeCommand);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        /// <summary>
        /// Get By Filter Paged StudentAnswerTargetRange
        /// </summary>
        ///<remarks>OrderBy default "Last Inserted or Last Updated value" also can be "idDESC","idASC","packageNameDESC","packageNameASC" </remarks>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<IEntity>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedStudentAnswerTargetRange")]
        public async Task<IActionResult> GetByFilterPagedStudentAnswerTargetRange([FromQuery] GetByFilterPagedStudentAnswerTargetRangeQuery query)
        {
            if (query.StudentAnswerTargetRangeDetailSearch == null)
            {
                query.StudentAnswerTargetRangeDetailSearch = new StudentAnswerTargetRangeDetailSearch
                {
                    PageNumber = 1,
                    PageSize = 10
                };
            }
            var result = await Mediator.Send(query);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


    }
}
