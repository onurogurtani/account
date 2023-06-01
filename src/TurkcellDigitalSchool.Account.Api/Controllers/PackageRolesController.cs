using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// PackageRoles If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PackageRolesController : BaseCrud2Controller<PackageRole, GetPackageRolesQuery, GetPackageRoleQuery, CreatePackageRoleCommand, UpdatePackageRoleCommand, DeletePackageRoleCommand>
    {
    }
}
