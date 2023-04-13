using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageContractType : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long ContractTypeId { get; set; }
        public TurkcellDigitalSchool.Entities.Concrete.ContractType ContractType { get; set; }
    }
}
