using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract
{
    public interface IFileRepository : IEntityReadRepository<File>
    {

    }
}
