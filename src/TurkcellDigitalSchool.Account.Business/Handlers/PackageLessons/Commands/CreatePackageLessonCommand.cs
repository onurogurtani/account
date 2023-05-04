using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreatePackageLessonCommand : CreateRequestBase<PackageLesson>
    {
        public class CreatePackageLessonCommandHandler : CreateRequestHandlerBase<PackageLesson>
        {
            public CreatePackageLessonCommandHandler(IPackageLessonRepository packageLessonRepository) : base(packageLessonRepository)
            {
            }
        }
    }
}

