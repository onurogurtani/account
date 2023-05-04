using System.Text.Json.Serialization;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class FileDto
    {
        public long Id { get; set; }
        public byte[] File { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        [JsonIgnore]
        public string FilePath { get; set; }
        public string Description { get; set; }
    }
}
