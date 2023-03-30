using System.Collections.Generic;
using System.Linq;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.Student;
using TurkcellDigitalSchool.Entities.Dtos.StudentAnswerTargetRangeDtos;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{

    public class StudentAnswerTargetRangeRepository : EfEntityRepositoryBase<StudentAnswerTargetRange, ProjectDbContext>, IStudentAnswerTargetRangeRepository
    {
        public StudentAnswerTargetRangeRepository(ProjectDbContext context) : base(context)
        {

        }

        public bool ExistByStudentPackege(long StudentId, long PackageId)
        {
            return Context.StudentAnswerTargetRanges.Any(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.UserId == StudentId && x.PackageId == PackageId);
        }

        public IQueryable<PackageStudentAnswerTargetRangeDto> FilterByPackageStudentAnswerTargetRange()
        {
            return (from sat in Context.StudentAnswerTargetRanges
                    join p in Context.Packages on sat.PackageId equals p.Id
                    select new PackageStudentAnswerTargetRangeDto
                    {
                        StudentAnswerTargetRange = sat,
                        Package = p
                    }).AsQueryable();
        }

        public StudentAnswerTargetRange GetById(long Id)
        {
            return Context.StudentAnswerTargetRanges.FirstOrDefault(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.Id == Id);

        }

        public List<StudentAnswerTargetRange> GetByPackageId(long PackageId)
        {
            return Context.StudentAnswerTargetRanges.Where(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.PackageId == PackageId).ToList();
        }

        public List<StudentAnswerTargetRange> GetByStudentId(long StudentId)
        {
            return Context.StudentAnswerTargetRanges.Where(x => x.IsDeleted == IsDeletedEnum.NotDeleted && x.UserId == StudentId).ToList();
        }
    }
}
