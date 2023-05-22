using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    /// <summary>
    /// Paket - Deneme sınavı ilişkili ortak tablo
    /// </summary>
    public class PackageTestExam : EntityDefault
    {
        public long TestExamId { get; set; } 
        public TestExam TestExam { get; set; }
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public Package Package { get; set; }
    }
}
