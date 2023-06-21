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
    [SecuredOperationScope]
    [LogScope]
    public class DeletePackageLessonCommand : DeleteRequestBase<PackageLesson>
    {
        public class DeleteRequestPackageLessonCommandHandler : DeleteRequestHandlerBase<PackageLesson, DeletePackageLessonCommand>
        {
            public DeleteRequestPackageLessonCommandHandler(IPackageLessonRepository repository) : base(repository)
            {
            }
        }
    }
}

