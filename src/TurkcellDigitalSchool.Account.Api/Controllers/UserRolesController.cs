using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// UserRoles If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : BaseCrud2Controller<UserRole,GetUserRolesQuery, GetUserRoleQuery, 
        CreateUserRoleCommand, UpdateUserRoleCommand, DeleteUserRoleCommand>
    {
    }
}
