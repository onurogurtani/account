using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TurkcellDigitalMessageMap.Account.Business.Handlers.MessageMaps.Queries;
using TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Entities.Concrete.MessageMap;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// MessageMaps If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MessageMapsController : BaseApiController
    {
        ///<summary>
        ///List TEntitys
        ///</summary>
        ///<remarks>OrderBy default "IdDESC" also can be "IdASC" ,"IdDESC",  "IdDESC","CodeDESC", "MessageASC" , "MessageDESC", "UsedClassASC", "UsedClassDESC" </remarks>
        ///<remarks>Field can be "Id" ,"Code",  "Message","MessageParameters", "UsedClass" , "OldVersionOfUserFriendlyMessage" </remarks>
        ///<return>PagedList MessageMapDto: Id, Code, Message, MessageParameters, UsedClass, OldVersionOfUserFriendlyMessage</return>
        ///<response code="200"></response>
        [AllowAnonymous]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<MessageMap>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getPagedList")]
        public async Task<IActionResult> GetList([FromBody] GetMessageMapsQuery query)
        {
            var result = await Mediator.Send(query);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Update MessageMap
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut()]
        public async Task<IActionResult> Update([FromBody] UpdateMessageMapCommand command)
        {
            var result = await Mediator.Send(command);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// MessagesToDatabase
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("messagesToDatabase")]
        public async Task<IActionResult> MessagesToDatabase()
        {
            var result = await Mediator.Send(new MessagesToDatabaseCommand());
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        ///<summary>
        ///MessageMapToRedis
        ///</summary>
        ///<remarks>TEntity</remarks>
        ///<return>TEntity</return>
        ///<response code="200"></response>
        [AllowAnonymous]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("messageMapToRedis")]
        public async Task<IActionResult> MessageMapToRedis()
        {
            var result = await Mediator.Send(new MessageMapToRedisCommand());
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<summary>
        ///Download Message
        ///</summary> ///<return>TEntitys List</return>
        ///<response code="200"></response>   
        [AllowAnonymous]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(byte[]))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("downloadFile")]
        public async Task<IActionResult> DownloadFile([FromBody] DownloadMessageMapCommand command)
        {
            var result = await Mediator.Send(command);
            if (result.Success)
            {
                return File(result.Data.File, result.Data.ContentType, result.Data.FileName);
            }
            return BadRequest(result);
        }
    }
}
