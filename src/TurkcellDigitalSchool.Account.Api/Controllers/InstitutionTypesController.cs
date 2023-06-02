using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// InstitutionTypes If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionTypesController : BaseCrudController<InstitutionType, GetInstitutionTypesQuery, GetInstitutionTypeQuery, CreateInstitutionTypeCommand, UpdateInstitutionTypeCommand, DeleteInstitutionTypeCommand>
    {
    }
}
