using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetTargetScreensQuery : QueryByFilterRequestBase<TargetScreen>
    {
        public class GetTargetScreensQueryHandler : QueryByFilterRequestHandlerBase<TargetScreen>
        {
            public GetTargetScreensQueryHandler(ITargetScreenRepository repository) : base(repository)
            {
            }
        }
    }
}