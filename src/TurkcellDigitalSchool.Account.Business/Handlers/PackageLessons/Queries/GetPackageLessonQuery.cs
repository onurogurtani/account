using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Queries
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]
    public class GetPackageLessonQuery : QueryByIdRequestBase<PackageLesson>
    {
        public class GetPackageLessonQueryHandler : QueryByIdRequestHandlerBase<PackageLesson, GetPackageLessonQuery>
        {
            public GetPackageLessonQueryHandler(IPackageLessonRepository packageLessonRepository) : base(packageLessonRepository)
            {
            }
        }
    }
}
