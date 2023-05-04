using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetGraduationYearQuery : QueryByIdRequestBase<GraduationYear>
    {
        public class GetGraduationYearQueryHandler : QueryByIdRequestHandlerBase<GraduationYear>
        {
            public GetGraduationYearQueryHandler(IGraduationYearRepository graduationYearRepository) : base(graduationYearRepository)
            {
            }
        }
    }
}
