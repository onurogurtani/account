using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers; 
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands
{
    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class CreatePackageLessonCommand : CreateRequestBase<PackageLesson>
    {
        public class CreateRequestPackageLessonCommandHandler : CreateRequestHandlerBase<PackageLesson, CreatePackageLessonCommand>
        {
            public CreateRequestPackageLessonCommandHandler(IPackageLessonRepository packageLessonRepository) : base(packageLessonRepository)
            {
            }
        }
    }
}

