using System;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging; 

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class PackageDetailSearch : PaginationQuery
    {
        public string Name { get; set; }
        public PackageKind PackageKind { get; set; }

        public long[] FieldTypeIds { get; set; } = new long[0];
        public long[] PackageTypeEnumIds { get; set; } = new long[0];
        public long[] PublisherIds { get; set; } = new long[0];

        public long[] EducationYearIds { get; set; } = new long[0];
        public long[] ClassroomIds { get; set; } = new long[0];
        public long[] LessonIds { get; set; } = new long[0];
        public bool? IsActive { get; set; }

        public long[] RoleIds { get; set; } = new long[0];

        public bool? HasCoachService { get; set; }
        public bool? HasMotivationEvent { get; set; }
        public bool? HasTryingTest { get; set; }
        public int? TryingTestQuestionCount { get; set; }
        public int? MaxNetCount { get; set; }

        public DateTime? ValidDate { get; set; }

        public string OrderBy { get; set; }
    }
}