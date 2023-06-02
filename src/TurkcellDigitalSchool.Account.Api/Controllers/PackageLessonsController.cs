using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// PackageLessons If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PackageLessonsController : BaseCrudController<PackageLesson, GetPackageLessonsQuery, GetPackageLessonQuery, CreatePackageLessonCommand, UpdatePackageLessonCommand, DeletePackageLessonCommand>
    {
    }
}
