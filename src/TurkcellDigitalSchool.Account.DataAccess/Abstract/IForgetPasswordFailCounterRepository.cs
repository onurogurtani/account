using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess; 

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IForgetPasswordFailCounterRepository : IEntityRepository<ForgetPasswordFailCounter>
    {
        Task ResetCsrfTokenForgetPasswordFailCount(string csrfToken);

        Task<int> IncCsrfTokenForgetPasswordFailCount(string csrfToken);
        Task<int> GetCsrfTokenForgetPasswordFailCount(string csrfToken);
    }
}