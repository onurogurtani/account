using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Queries;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : BaseCrudController<AppSetting>
    {

        /// <summary>
        /// Get Job Settings
        /// </summary>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [AllowAnonymous]
        [HttpGet("getJobSettings")]
        public async Task<IActionResult> GetJobSettings(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetJobSettingsQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        
        /// <summary>
        /// You can get password rules
        /// </summary>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<List<GetPasswordRulesQueryResultDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [AllowAnonymous]
        [HttpGet("getPasswordRules")]
        public async Task<IActionResult> GetPasswordRules(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetPasswordRulesQuery(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }



        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>TEntitys</remarks>
        ///<return>Get App Setting</return>
        ///<response code="200"></response>  
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<AppSetting>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getAppSetting")]
        public async Task<IActionResult> GetAppSetting([FromBody] GetAppSettingByCodeQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetAppSettingByCodeQuery { CustomerId = query.CustomerId, Code = query.Code, VouId = query.VouId }, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        ///Set Default Password  Rule and Period Value 
        /// </summary>
        /// <param name="setPasswordRuleAndPeriodValueCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("SetPasswordRuleAndPeriodValue")]
        public async Task<IActionResult> Add([FromBody] SetPasswordRuleAndPeriodValueCommand setPasswordRuleAndPeriodValueCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(setPasswordRuleAndPeriodValueCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        /// <summary>
        /// Get Default Password  Rule and Period Value 
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [HttpGet("GetPasswordRuleAndPeriod")]
        public async Task<IActionResult> GetPasswordRuleAndPeriod(CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetPasswordRuleAndPeriodQuery(), cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            } 
            return BadRequest(result);
        }
    }
}
