using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetGraduationYearsQuery : QueryByFilterRequestBase<GraduationYear>
    {
        public class GetGraduationYearsQueryHandler : QueryByFilterRequestHandlerBase<GraduationYear>
        {
            public GetGraduationYearsQueryHandler(IGraduationYearRepository repository) : base(repository)
            {
            }
        }
    }
}