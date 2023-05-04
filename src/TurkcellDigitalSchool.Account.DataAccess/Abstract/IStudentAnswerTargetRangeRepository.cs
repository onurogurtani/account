using System.Collections.Generic;
using System.Linq;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.DataAccess;  

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IStudentAnswerTargetRangeRepository : IEntityDefaultRepository<StudentAnswerTargetRange>
    {
        bool ExistByStudentPackege(long StudentId, long PackageId);
        StudentAnswerTargetRange GetById(long Id);
        List<StudentAnswerTargetRange> GetByStudentId(long StudentId);
        List<StudentAnswerTargetRange> GetByPackageId(long PackageId);
        IQueryable<PackageStudentAnswerTargetRangeDto> FilterByPackageStudentAnswerTargetRange();

    }
}
