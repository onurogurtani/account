using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageContractType : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long ContractTypeId { get; set; }
        public ContractType ContractType { get; set; }
    }
}
