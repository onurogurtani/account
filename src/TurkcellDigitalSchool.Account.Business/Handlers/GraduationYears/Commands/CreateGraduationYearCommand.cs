using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateGraduationYearCommand : CreateRequestBase<GraduationYear>
    {
        public class CreateGraduationYearCommandHandler : CreateRequestHandlerBase<GraduationYear>
        {
            public CreateGraduationYearCommandHandler(IGraduationYearRepository graduationYearRepository) : base(graduationYearRepository)
            {
            }
        }
    }
}

