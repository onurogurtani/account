using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserSupportTeamViewMyDataRepository : EfEntityRepositoryBase<UserSupportTeamViewMyData, ProjectDbContext>, IUserSupportTeamViewMyDataRepository
    {
        public UserSupportTeamViewMyDataRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
