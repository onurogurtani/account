using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetPackageLessonsQuery : QueryByFilterRequestBase<PackageLesson>
    {
        public class GetPackageLessonsQueryHandler : QueryByFilterRequestHandlerBase<PackageLesson>
        {
            public GetPackageLessonsQueryHandler(IPackageLessonRepository repository) : base(repository)
            {
            }
        }
    }
}