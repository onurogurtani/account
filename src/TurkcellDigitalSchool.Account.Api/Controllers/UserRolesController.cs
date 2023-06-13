using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// UserRoles If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : BaseCrudController<UserRole,GetUserRolesQuery, GetUserRoleQuery, 
        CreateUserRoleCommand, UpdateUserRoleCommand, DeleteUserRoleCommand>
    {
    }
}
