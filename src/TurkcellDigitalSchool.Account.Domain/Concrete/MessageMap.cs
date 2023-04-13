using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class MessageMap : EntityDefault
    {
        public string Code { get; set; }
        public string MessageKey { get; set; }
        public string Message { get; set; }
        public string MessageParameters { get; set; }
        public string UserFriendlyNameOfMessage { get; set; }
        public string OldVersionOfUserFriendlyMessage { get; set; }
        public string UsedClass { get; set; }
        public string DefaultNameOfUsedClass { get; set; }
        public string UserFriendlyNameOfUsedClass { get; set; }
    }
}