using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;
using TurkcellDigitalSchool.Core.Common.Controllers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Make it Authorization operations
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : BaseApiController
    {
        private readonly IConfiguration _configuration;
        private readonly ITokenHelper _jwtHelper;

        /// <summary>
        /// Dependency injection is provided by constructor injection.
        /// </summary>
        /// <param name="configuration"></param>
        public IdentityController(IConfiguration configuration, ITokenHelper jwtHelper)
        {
            _configuration = configuration;
            _jwtHelper = jwtHelper;
        }

        /// <summary>
        /// Otp İçin Gönderilir
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        //[AllowAnonymous]
        //[Consumes("application/json")]
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginUserQuery loginModel, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(loginModel, cancellationToken);

        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }

        //    return BadRequest(result);
        //}


        /// <summary>
        /// Otp İçin Gönderilir Ldap
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        //[AllowAnonymous]
        //[Consumes("application/json")]
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPost("LoginByLdap")]
        //public async Task<IActionResult> LoginByLdap([FromBody] LoginUserByLdapQuery loginModel, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(loginModel, cancellationToken);

        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }

        //    return BadRequest(result);
        //}

        /// <summary>
        /// Otp İçin Gönderilir Hızlı Giriş
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        //[AllowAnonymous]
        //[Consumes("application/json")]
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPost("LoginByTurkcellFastLogin")]
        //public async Task<IActionResult> LoginByTurkcellFastLogin([FromBody] LoginUserByTurkcellFastLoginQuery loginModel, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(loginModel, cancellationToken);

        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }

        //    return BadRequest(result);
        //}


        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("BehalfOfLogin")]
        public async Task<IActionResult> BehalfOfLogin([FromBody] BehalfOfLoginQuery loginModel, CancellationToken cancellationToken)
        {
            return Ok();
            var result = await Mediator.Send(loginModel, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// Direk Token Almak İçin Development İçin
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        //[AllowAnonymous]
        //[Consumes("application/json")]
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPost("loginTry")]
        //public async Task<IActionResult> LoginTry([FromBody] LoginUserTryQuery loginModel, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(loginModel, cancellationToken);
        //    return Ok(result);
        //}

        /// <summary>
        /// Logout
        /// </summary>
        /// <param name="logoutUserQuery"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutUserQuery logoutUserQuery, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(logoutUserQuery, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        /// Yeniden Sms Gönderme
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("resendotpsms")]
        public async Task<IActionResult> ReSendOtpSms([FromBody] ReSendOtpSmsQuery loginModel, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(loginModel, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        /// <summary>
        /// Login Servisleri Sonrası Dönen Otp İle Token Alınır 
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        //[AllowAnonymous]
        //[Consumes("application/json")]
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpPost("loginOtp")]
        //public async Task<IActionResult> LoginOtp([FromBody] LoginOtpQuery loginModel, CancellationToken cancellationToken)
        //{
        //    var result = await Mediator.Send(loginModel, cancellationToken);

        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }

        //    return BadRequest(result);
        //}


        #region New Login Endpoinds

        /// <summary>
        /// Yeniden Sms Gönderme
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<string>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("loginFailReSendOtpSms")]
        public async Task<IActionResult> LoginFailReSendOtpSms([FromBody] LoginFailReSendOtpSmsQuery loginModel, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(loginModel, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        /// <summary>
        /// Otp chek işlemi
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<string>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("loginFailCheckOtp")]
        public async Task<IActionResult> LoginFailCheckOtpQuery([FromBody] LoginFailCheckOtpQuery request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        /// Otp chek işlemi
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<string>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("loginFailOtpNewPassword")]
        public async Task<IActionResult> LoginFailOtpNewPassword([FromBody] LoginFailOtpNewPasswordCommand request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        /// Parolamı unuttum işlemleri için kullanılır.
        /// 400  ise gelen datadaki bilgilere göre captcha gösterilir.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<string>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("forgotPasswordWithCheckFailCount")]
        public async Task<IActionResult> ForgotPasswordWithCheckFailCount([FromBody] ForgotPasswordWithCheckFailCountCommand request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        /// Parola değiştirme link in kontrol işlerinin yapılması için kullanılır. 200 ise parola değiştirme adımı işletilir.
        /// 400 ise şifremi unuttum adımı işletilir.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<string>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("ForgotPasswordSendLinkCheck")]
        public async Task<IActionResult> ForgotPasswordSendLinkCheck([FromBody] ForgotPasswordSendLinkCheckCommand request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }



        /// <summary>
        /// Parola değiştirme link ile beraber şifre değiştirmek için kullanılır.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<string>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("forgotPasswordSendLinkChangePassword")]
        public async Task<IActionResult> ForgotPasswordSendLinkChangePassword([FromBody] ForgotPasswordSendLinkChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(request, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        /// <summary>
        /// Loginde parola değiştirme süresi gelen kullanıcı için parola değiştirme işlemi yapılır.
        /// </summary>
        /// <return></return>
        /// <response code="200"></response>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPut("oldPasswordToNewPassword")]
        public async Task<IActionResult> OldPasswordToNewPassword([FromBody] OldPasswordToNewPasswordCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        #endregion





        /// <summary>
        ///  Make it User Register operations
        /// </summary>
        /// <param name="register"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        ///  Make it User Register operations
        /// </summary>
        /// <param name="register"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("unverifiedregister")]
        public async Task<IActionResult> UnverifiedRegister([FromBody] UnverifiedUserCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        /// <summary>
        ///  Make it User Register operations
        /// </summary>
        /// <param name="register"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("verifyuser")]
        public async Task<IActionResult> UnverifiedRegister([FromBody] VerifyUserCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Generate New Verification Code
        /// </summary>
        /// <param name="user Id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("generatenewverificationcode")]
        public async Task<IActionResult> GenereteNewVerificationCode([FromBody] GenerateNewVerificationCodeCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Otp Register
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("registerOtp")]
        public async Task<IActionResult> RegisterOtp([FromBody] RegisterOtpQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Make it Forgot Password operations
        /// </summary>
        /// <remarks>tckimlikno</remarks>
        /// <return></return>
        /// <response code="200"></response>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand forgotPassword, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(forgotPassword, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Make it Forgotten Password Change operations
        /// </summary>
        /// <remarks>tckimlikno</remarks>
        /// <return></return>
        /// <response code="200"></response>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("forgottenpasswordchange")]
        public async Task<IActionResult> ForgottenPasswordChange([FromBody] ForgottenPasswordChangeCommand forgottenPasswordChangeCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(forgottenPasswordChangeCommand, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Make it Forgotten Password Change operations
        /// </summary>
        /// <remarks>tckimlikno</remarks>
        /// <return></return>
        /// <response code="200"></response>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPut("forgottenPasswordTokenCheck")]
        public async Task<IActionResult> ForgottenPasswordTokenCheck([FromBody] ForgottenPasswordTokenCheckCommand forgottenPasswordTokenCheckCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(forgottenPasswordTokenCheckCommand, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        /// <summary>
        /// Make it Change Password operation
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("changeuserpassword")]
        public async Task<IActionResult> ChangeUserPassword([FromBody] UserChangePasswordCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Token decode test
        /// </summary>
        /// <returns></returns>
        //[Consumes("application/json")]
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        //[HttpPost("test")]
        //public IActionResult LoginTest()
        //{
        //    var auth = Request.Headers["Authorization"];
        //    var token = _jwtHelper.DecodeToken(auth);

        //    return Ok(token);
        //}

        /// <summary>
        /// Make it UserName Suggest operations
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SelectionItem>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("userNameSuggest")]
        public async Task<IActionResult> UserNameSuggest([FromBody] GetUserNameSuggestQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);

            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }




        /// <summary>
        /// Make it Change Password operation
        /// </summary>
        /// <return></return>
        /// <response code="200"></response>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}