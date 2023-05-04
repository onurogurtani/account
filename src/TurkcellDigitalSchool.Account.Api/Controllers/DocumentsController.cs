using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Documents If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : BaseCrudController<Document>
    {

        ///<summary>
        /// Get New Versiyon No
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<DocumentVersionDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getNewVersion")]
        public async Task<IActionResult> GetNewVersion([FromQuery] GetNewVersionQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        ///<summary>
        ///Copy Document
        ///</summary>
        ///<return>TEntity</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Document>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("copyDocument")]
        public async Task<IActionResult> CopyDocument(CopyDocumentCommand query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Update TEntity.
        /// </summary>
        /// <param name="updateDocumentCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Document>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("UpdateDocument")]
        public async Task<IActionResult> Update([FromBody] UpdateDocumentCommand updateDocumentCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updateDocumentCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


     
           ///<summary>
        ///Get By with relation data Document 
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Document))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getByDocument")]
        public async Task<IActionResult> GetByDocument([FromQuery] GetDocumentQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        ///<summary>
        ///Get Filtered Paged Documents with relation data 
        ///</summary>
        ///<remarks>OrderBy default "IdDESC" also can be "RecordStatusASC","RecordStatusDESC","ContractKindASC","ContractKindDESC","ContractTypeASC","ContractTypeDESC","ContentASC","ContentDESC","VersionASC","VersionDESC","ValidStartDateASC","ValidStartDateDESC","ValidEndDateASC","ValidEndDateDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC"  </remarks>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<DocumentDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getByFilterPagedDocuments")]
        public async Task<IActionResult> GetByFilterPagedDocuments([FromQuery] GetByFilterPagedDocumentsQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

    }
}
