using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    /// <summary>
    /// Paket - Deneme sınavı ilişkili ortak tablo
    /// </summary>
    public class PackageTestExam :   IReadOnlyEntity
    {
        public long TestExamId { get; set; }
        public TestExam TestExam { get; set; }
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public Package Package { get; set; }

        public long Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
