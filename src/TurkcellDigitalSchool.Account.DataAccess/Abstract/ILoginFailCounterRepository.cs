using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface ILoginFailCounterRepository : IEntityRepository<LoginFailCounter>
    {


        public Task ResetCsrfTokenFailLoginCount(string csrfToken);


        public Task<int> IncCsrfTokenFailLoginCount(string csrfToken);

        public Task<int> GetCsrfTokenFailLoginCount(string csrfToken);
         
    }
}