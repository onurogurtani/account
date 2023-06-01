using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Queries;
using TurkcellDigitalSchool.Account.Business.Handlers.Countys.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Countys If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CountysController : BaseCrud2Controller<County,GetCountysQuery,GetCountyQuery, CreateCountyCommand, UpdateCountyCommand, DeleteCountyCommand>
    {
    }
}
