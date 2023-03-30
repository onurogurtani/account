using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateGraduationYearCommand : UpdateRequestBase<GraduationYear>
    {
        public class UpdateGraduationYearCommandHandler : UpdateRequestHandlerBase<GraduationYear>
        {
            public UpdateGraduationYearCommandHandler(IGraduationYearRepository graduationYearRepository) : base(graduationYearRepository)
            {
            }
        }
    }
}

