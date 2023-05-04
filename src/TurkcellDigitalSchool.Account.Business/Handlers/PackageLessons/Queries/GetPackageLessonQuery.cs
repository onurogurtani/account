using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetPackageLessonQuery : QueryByIdRequestBase<PackageLesson>
    {
        public class GetPackageLessonQueryHandler : QueryByIdRequestHandlerBase<PackageLesson>
        {
            public GetPackageLessonQueryHandler(IPackageLessonRepository packageLessonRepository) : base(packageLessonRepository)
            {
            }
        }
    }
}
