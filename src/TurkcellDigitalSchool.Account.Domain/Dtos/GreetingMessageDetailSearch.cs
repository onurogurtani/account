using System;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    /// <summary>
    /// User search  
    /// </summary>
    public class GreetingMessageDetailSearch : PaginationQuery
    {
        public bool HasDateRange { get; set; }
    }
}
