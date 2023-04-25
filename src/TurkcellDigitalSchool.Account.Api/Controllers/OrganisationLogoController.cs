using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Organisations If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OrganisationLogoController : BaseApiController
    {
        //TODO organisation logo için þuan file servisi kullanýlýyor.

        /////<summary>
        /////It brings the details according to its id.
        /////</summary>
        /////<remarks>TEntity</remarks>
        /////<return>TEntity</return>
        /////<response code="200"></response>
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<OrganisationLogoDto>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpGet("getbyid")]
        //public async Task<IActionResult> GetById([FromQuery] GetOrganisationLogoQuery getOrganisationLogoQuery, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(getOrganisationLogoQuery, cancellationToken);
        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }
        //    return BadRequest(result);
        //}

        ///// <summary>
        ///// Add TEntity.
        ///// </summary>
        ///// <param name="createOrganisationLogoCommand"></param>
        ///// <returns></returns>
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPost("Add")]
        //public async Task<IActionResult> Add([FromForm] CreateOrganisationLogoCommand createOrganisationLogoCommand, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(createOrganisationLogoCommand, cancellationToken);
        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }
        //    return BadRequest(result);
        //}

        ///// <summary>
        ///// Update TEntity.
        ///// </summary>
        ///// <param name="updateOrganisationLogoCommand"></param>
        ///// <returns></returns>
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<Entities.Concrete.File>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPut("Update")]
        //public async Task<IActionResult> Update([FromForm] UpdateOrganisationLogoCommand updateOrganisationLogoCommand, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(updateOrganisationLogoCommand, cancellationToken);
        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }
        //    return BadRequest(result);
        //}
    }
}
