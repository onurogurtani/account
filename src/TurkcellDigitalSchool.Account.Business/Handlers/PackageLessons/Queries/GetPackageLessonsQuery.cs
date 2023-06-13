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
    [SecuredOperationScope]
    [LogScope]
    public class GetPackageLessonsQuery : QueryByFilterRequestBase<PackageLesson>
    {
        public class GetPackageLessonsQueryHandler : QueryByFilterRequestHandlerBase<PackageLesson, GetPackageLessonsQuery>
        {
            public GetPackageLessonsQueryHandler(IPackageLessonRepository repository) : base(repository)
            {
            }
        }
    }
}