﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries;
using System.Collections.Generic;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// UserPackages If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserPackagesController : BaseCrudController<UserPackage>
    {

        ///<summary>
        ///Get UserPackage By UserId 
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserPackageDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getUserPackagesByUserId")]
        public async Task<IActionResult> GetUserPackagesByUserId([FromQuery] GetUserPackagesByUserIdQuery query, CancellationToken cancellationToken)
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
