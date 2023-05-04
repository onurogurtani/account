using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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

