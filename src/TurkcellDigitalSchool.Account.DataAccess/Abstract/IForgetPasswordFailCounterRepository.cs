using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IForgetPasswordFailCounterRepository : IEntityRepository<ForgetPasswordFailCounter>
    {
        Task ResetCsrfTokenForgetPasswordFailCount(string csrfToken);

        Task<int> IncCsrfTokenForgetPasswordFailCount(string csrfToken);
        Task<int> GetCsrfTokenForgetPasswordFailCount(string csrfToken);
    }
}