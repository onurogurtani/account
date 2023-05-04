using System;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class DocumentDto : Document
    {
        public string InsertUserFullName { get; set; }
        public string UpdateUserFullName { get; set; }

        public new DateTime InsertTime { get; set; }
        public new long? InsertUserId { get; set; }
        public new DateTime? UpdateTime { get; set; }
        public new long? UpdateUserId { get; set; }
    }
}