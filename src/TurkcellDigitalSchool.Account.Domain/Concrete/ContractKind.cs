using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class ContractKind : EntityDefinition
    {
        public string Description { get; set; }

        [Required]
        public long ContractTypeId { get; set; }

        [ForeignKey(nameof(ContractTypeId))]
        public ContractType ContractType { get; set; }

    }
}
