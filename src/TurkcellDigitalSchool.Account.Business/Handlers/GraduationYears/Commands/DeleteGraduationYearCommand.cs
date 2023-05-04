using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteGraduationYearCommand : DeleteRequestBase<GraduationYear>
    {
        public class DeleteGraduationYearCommandHandler : DeleteRequestHandlerBase<GraduationYear>
        {
            public DeleteGraduationYearCommandHandler(IGraduationYearRepository repository) : base(repository)
            {
            }
        }
    }
}

