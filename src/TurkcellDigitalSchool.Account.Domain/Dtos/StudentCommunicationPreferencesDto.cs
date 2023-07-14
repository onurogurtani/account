namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class StudentCommunicationPreferencesDto
    {
        public bool IsSms { get; set; }
        public bool IsEMail { get; set; }
        public bool IsCall { get; set; }
        public bool IsNotification { get; set; }
    }
}
