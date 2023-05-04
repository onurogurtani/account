namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class AvatarFilesDto
    {
        public long Id { get; set; }
        public byte[] Image { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
