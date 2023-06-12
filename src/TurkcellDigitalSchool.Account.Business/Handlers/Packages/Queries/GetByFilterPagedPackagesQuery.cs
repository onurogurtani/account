using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    ///<summary>
    ///Get Filtered Paged Packages with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be "IsActiveASC","IsActiveDESC","NameASC","NameDESC","PackageKindASC","PackageKindDESC","SummaryASC","SummaryDESC","ContentASC","ContentDESC","PackageTypeASC","PackageTypeDESC","MaxNetCountASC","MaxNetCountDESC","EducationYearASC","EducationYearDESC","ClassroomDESC","ClassroomASC","LessonDESC","LessonASC","PackageFieldTypeASC","PackageFieldTypeDESC","RoleDESC","RoleASC","StartDateASC","StartDateDESC","FinishDateASC","FinishDateDESC","HasCoachServiceASC","HasCoachServiceDESC","HasTryingTestASC","HasTryingTestDESC","TryingTestQuestionCountASC","TryingTestQuestionCountDESC","HasMotivationEventASC","HasMotivationEventDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC"  </remarks>
    [LogScope]
    [SecuredOperation]
    public class GetByFilterPagedPackagesQuery : IRequest<DataResult<PagedList<Package>>>
    {
        public PackageDetailSearch PackageDetailSearch { get; set; } = new PackageDetailSearch();

        public class GetByFilterPagedPackagesQueryHandler : IRequestHandler<GetByFilterPagedPackagesQuery, DataResult<PagedList<Package>>>
        {
            private readonly IPackageRepository _packageRepository;

            public GetByFilterPagedPackagesQueryHandler(IPackageRepository packageRepository)
            {
                _packageRepository = packageRepository;
            }
           
            public virtual async Task<DataResult<PagedList<Package>>> Handle(GetByFilterPagedPackagesQuery request, CancellationToken cancellationToken)
            {
                var query = _packageRepository.Query()
                    .Include(x => x.ImageOfPackages).ThenInclude(x => x.File)
                    .Include(x => x.PackageLessons).ThenInclude(x => x.Lesson).ThenInclude(x => x.Classroom)
                    .Include(x => x.PackageRoles).ThenInclude(x => x.Role)
                    .Include(x => x.PackageDocuments).ThenInclude(x => x.Document)
                    .Include(x => x.PackagePublishers).ThenInclude(x => x.Publisher)
                    .Include(x => x.PackageContractTypes).ThenInclude(x => x.ContractType)
                    .Include(x => x.PackageFieldTypes)
                    .Include(x => x.PackagePackageTypeEnums)
                    .Include(x => x.TestExamPackages)
                    .Include(x => x.CoachServicePackages)
                    .Include(x => x.MotivationActivityPackages)
                    .Include(x => x.PackageEvents)
                    .Include(x => x.PackageTestExams)
                    .Include(x => x.EducationYear)
                    .AsQueryable();



                if (request.PackageDetailSearch.FieldTypeIds?.Length > 0)
                    query = query.Where(x => x.PackageFieldTypes.Any(q => request.PackageDetailSearch.FieldTypeIds.Contains((long)q.FieldType)));

                if (request.PackageDetailSearch.PublisherIds?.Length > 0)
                    query = query.Where(x => x.PackagePublishers.Any(q => request.PackageDetailSearch.PublisherIds.Contains((long)q.PublisherId)));

                if (request.PackageDetailSearch.PackageTypeEnumIds?.Length > 0)
                    query = query.Where(x => request.PackageDetailSearch.PackageTypeEnumIds.Contains((long)x.PackageTypeEnum));

                 if (request.PackageDetailSearch.PackageKindIds?.Length > 0)
                    query = query.Where(x => request.PackageDetailSearch.PackageKindIds.Contains((long)x.PackageKind));

                  if (request.PackageDetailSearch.ExamKindIds?.Length > 0)
                    query = query.Where(x => request.PackageDetailSearch.ExamKindIds.Contains((long)x.ExamKind));


                if (request.PackageDetailSearch.PackageTypeEnumIds?.Length > 0)
                    query = query.Where(x => x.PackagePackageTypeEnums.Any(q => request.PackageDetailSearch.PackageTypeEnumIds.Contains((long)q.PackageTypeEnum))); 
                
              


                if (!string.IsNullOrWhiteSpace(request.PackageDetailSearch.Name))
                    query = query.Where(x => x.Name.Contains(request.PackageDetailSearch.Name));

                if (request.PackageDetailSearch.PackageKind > 0)
                    query = query.Where(x => x.PackageKind == request.PackageDetailSearch.PackageKind);

                if (request.PackageDetailSearch.EducationYearIds?.Length > 0)
                    query = query.Where(x => request.PackageDetailSearch.EducationYearIds.Contains(x.EducationYearId));

                if (request.PackageDetailSearch.ClassroomIds?.Length > 0)
                    query = query.Where(x => x.PackageLessons.Any(q => request.PackageDetailSearch.ClassroomIds.Contains(q.Lesson.ClassroomId)));

                if (request.PackageDetailSearch.LessonIds?.Length > 0)
                    query = query.Where(x => x.PackageLessons.Any(q => request.PackageDetailSearch.LessonIds.Contains(q.LessonId)));

                if (request.PackageDetailSearch.IsActive != null)
                    query = query.Where(x => x.IsActive == request.PackageDetailSearch.IsActive);

                if (request.PackageDetailSearch.RoleIds?.Length > 0)
                    query = query.Where(x => x.PackageRoles.Any(q => request.PackageDetailSearch.RoleIds.Contains(q.RoleId)));

                if (request.PackageDetailSearch.HasCoachService != null)
                    query = query.Where(x => x.HasCoachService == request.PackageDetailSearch.HasCoachService);

                if (request.PackageDetailSearch.HasMotivationEvent != null)
                    query = query.Where(x => x.HasMotivationEvent == request.PackageDetailSearch.HasMotivationEvent);

                if (request.PackageDetailSearch.HasTryingTest != null)
                    query = query.Where(x => x.HasTryingTest == request.PackageDetailSearch.HasTryingTest);

                if (request.PackageDetailSearch.TryingTestQuestionCount != null)
                    query = query.Where(x => x.TryingTestQuestionCount == request.PackageDetailSearch.TryingTestQuestionCount);


                if (request.PackageDetailSearch.ValidDate.HasValue)
                    query = query.Where(x =>
                    x.StartDate <= request.PackageDetailSearch.ValidDate &&
                    x.FinishDate >= request.PackageDetailSearch.ValidDate);

                query = request.PackageDetailSearch.OrderBy switch
                {
                    "IsActiveASC" => query.OrderBy(x => x.IsActive),
                    "IsActiveDESC" => query.OrderByDescending(x => x.IsActive),
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "PackageKindASC" => query.OrderBy(x => x.PackageKind),
                    "PackageKindDESC" => query.OrderByDescending(x => x.PackageKind),
                    "SummaryASC" => query.OrderBy(x => x.Summary),
                    "SummaryDESC" => query.OrderByDescending(x => x.Summary),
                    "ContentASC" => query.OrderBy(x => x.Content),
                    "ContentDESC" => query.OrderByDescending(x => x.Content),
                    "PackageTypeASC" => query.OrderBy(x => x.PackageTypeEnum),
                    "PackageTypeDESC" => query.OrderByDescending(x => x.PackageTypeEnum),
                    "EducationYearASC" => query.OrderBy(x => x.EducationYear.StartYear),
                    "EducationYearDESC" => query.OrderByDescending(x => x.EducationYear.StartYear),
                    "ClassroomDESC" => query.OrderByDescending(x => x.PackageLessons.First().Lesson.Classroom.Name),
                    "ClassroomASC" => query.OrderBy(x => x.PackageLessons.First().Lesson.Classroom.Name),
                    "LessonDESC" => query.OrderByDescending(x => x.PackageLessons.First().Lesson.Name),
                    "LessonASC" => query.OrderBy(x => x.PackageLessons.First().Lesson.Name),
                    "PackageFieldTypeASC" => query.OrderBy(x => x.PackageFieldTypes.First().FieldType),
                    "PackageFieldTypeDESC" => query.OrderByDescending(x => x.PackageFieldTypes.First().FieldType),
                    "RoleDESC" => query.OrderByDescending(x => x.PackageRoles.First().Role.Name),
                    "RoleASC" => query.OrderBy(x => x.PackageRoles.First().Role.Name),
                    "StartDateASC" => query.OrderBy(x => x.StartDate),
                    "StartDateDESC" => query.OrderByDescending(x => x.StartDate),
                    "FinishDateASC" => query.OrderBy(x => x.FinishDate),
                    "FinishDateDESC" => query.OrderByDescending(x => x.FinishDate),
                    "HasCoachServiceASC" => query.OrderBy(x => x.HasCoachService),
                    "HasCoachServiceDESC" => query.OrderByDescending(x => x.HasCoachService),
                    "HasTryingTestASC" => query.OrderBy(x => x.HasTryingTest),
                    "HasTryingTestDESC" => query.OrderByDescending(x => x.HasTryingTest),
                    "TryingTestQuestionCountASC" => query.OrderBy(x => x.TryingTestQuestionCount),
                    "TryingTestQuestionCountDESC" => query.OrderByDescending(x => x.TryingTestQuestionCount),
                    "HasMotivationEventASC" => query.OrderBy(x => x.HasMotivationEvent),
                    "HasMotivationEventDESC" => query.OrderByDescending(x => x.HasMotivationEvent),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime),
                    "UpdateTimeDESC" => query.OrderByDescending(x => x.UpdateTime),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };

                var items = await query.Skip((request.PackageDetailSearch.PageNumber - 1) * request.PackageDetailSearch.PageSize)
                        .Take(request.PackageDetailSearch.PageSize)
                        .ToListAsync();

                var pagedList = new PagedList<Package>(items, query.Count(), request.PackageDetailSearch.PageNumber, request.PackageDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<Package>>(pagedList);
            }
        }

    }
}