using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class StudentParentInformationRepository : EfEntityRepositoryBase<StudentParentInformation, AccountDbContext>, IStudentParentInformationRepository
    {
        public StudentParentInformationRepository(AccountDbContext context) : base(context)
        {

        }
    }

}
