using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeletePackageLessonCommand : DeleteRequestBase<PackageLesson>
    {
        public class DeletePackageLessonCommandHandler : DeleteRequestHandlerBase<PackageLesson>
        {
            public DeletePackageLessonCommandHandler(IPackageLessonRepository repository) : base(repository)
            {
            }
        }
    }
}

