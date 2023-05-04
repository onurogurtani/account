using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface ILoginFailCounterRepository : IEntityRepository<LoginFailCounter>
    {


        public Task ResetCsrfTokenFailLoginCount(string csrfToken);


        public Task<int> IncCsrfTokenFailLoginCount(string csrfToken);

        public Task<int> GetCsrfTokenFailLoginCount(string csrfToken);
         
    }
}