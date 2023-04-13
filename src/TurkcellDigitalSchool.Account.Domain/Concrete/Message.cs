using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class Message : EntityDefault
    {
        public string MessageKey { get; set; }
        public string UsedClass { get; set; }
        public int MessageNumber { get; set; }

        public long MessageTypeId { get; set; }
        public MessageType MessageType { get; set; }
    }
}
