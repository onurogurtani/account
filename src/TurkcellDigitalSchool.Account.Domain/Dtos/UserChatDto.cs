using System;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserChatDto
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public UserType UserType { get; set; }
    }
}