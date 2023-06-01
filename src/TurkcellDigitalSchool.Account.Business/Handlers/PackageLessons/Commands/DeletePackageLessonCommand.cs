using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class DeletePackageLessonCommand : DeleteRequestBase<PackageLesson>
    {
        public class DeletePackageLessonCommandHandler : DeleteHandlerBase<PackageLesson, DeletePackageLessonCommand>
        {
            public DeletePackageLessonCommandHandler(IPackageLessonRepository repository) : base(repository)
            {
            }
        }
    }
}

