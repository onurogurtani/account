using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    /// <summary>
    /// İmzalatılacak Evrak-Dökümanlar
    /// </summary>
    public class Document : EntityDefault
    {
        public RecordStatus RecordStatus { get; set; } = RecordStatus.Active;
        public string Content { get; set; }
        public int Version { get; set; }
        public bool RequiredApproval { get; set; }
        public bool ClientRequiredApproval { get; set; }

        public long ContractKindId { get; set; }
        public  ContractKind ContractKind { get; set; }

         public ICollection< DocumentContractType> ContractTypes { get; set; }

        public DateTime ValidStartDate { get; set; }
        public DateTime ValidEndDate { get; set; }

    }
}
