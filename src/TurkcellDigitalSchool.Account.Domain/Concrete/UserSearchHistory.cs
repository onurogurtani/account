using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UserSearchHistory : EntityDefault
    {
        public string Text { get; set; }
        public long UserId { get; set; }
    }
}
