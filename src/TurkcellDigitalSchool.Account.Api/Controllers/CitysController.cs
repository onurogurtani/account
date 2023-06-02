using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Citys If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CitysController : BaseCrudController<City,GetCitysQuery,GetCityQuery,CreateCityCommand,UpdateCityCommand,DeleteCityCommand>
    { 
    }
}
