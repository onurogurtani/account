using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdatePackageLessonCommand : UpdateRequestBase<PackageLesson>
    {
        public class UpdatePackageLessonCommandHandler : UpdateRequestHandlerBase<PackageLesson>
        {
            public UpdatePackageLessonCommandHandler(IPackageLessonRepository packageLessonRepository) : base(packageLessonRepository)
            {
            }
        }
    }
}

