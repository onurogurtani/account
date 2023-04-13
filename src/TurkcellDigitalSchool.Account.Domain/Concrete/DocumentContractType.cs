using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class DocumentContractType : EntityDefault
    {
        public long ContractTypeId { get; set; }
        public ContractType ContractType { get; set; }
        public long DocumentId { get; set; }

    }
}
