namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class MessageMapDto
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        public string MessageParameters { get; set; }
        public string UsedClass { get; set; }
        public string OldVersionOfUserFriendlyMessage { get; set; }
    }
}
