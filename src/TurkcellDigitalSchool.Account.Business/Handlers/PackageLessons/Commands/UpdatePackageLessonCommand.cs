using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]
    public class UpdatePackageLessonCommand : UpdateRequestBase<PackageLesson>
    {
        public class UpdateRequestPackageLessonCommandHandler : UpdateRequestHandlerBase<PackageLesson, UpdatePackageLessonCommand>
        {
            public UpdateRequestPackageLessonCommandHandler(IPackageLessonRepository packageLessonRepository) : base(packageLessonRepository)
            {
            }
        }
    }
}

