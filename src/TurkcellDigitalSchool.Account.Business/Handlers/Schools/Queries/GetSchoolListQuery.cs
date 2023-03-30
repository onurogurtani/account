using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Queries
{ 
    public class GetSchoolListQuery : IRequest<IDataResult<PagedList<School>>>
    {
        public PaginationQuery PaginationQuery { get; set; }

        public SchoolDto QueryDto { get; set; }

        public class SchoolDto
        {
            public bool AllRecords { get; set; }
            public bool RecordStatus { get; set; }
            public long? InstitutionId { get; set; }
            public long? CityId { get; set; }
            public long? CountyId { get; set; }
        }

        public class GetSchoolListQueryHandler : IRequestHandler<GetSchoolListQuery, IDataResult<PagedList<School>>>
        {
            private readonly ISchoolRepository _schoolRepository;

            public GetSchoolListQueryHandler(ISchoolRepository schoolRepository, IMapper mapper, IMediator mediator)
            {
                _schoolRepository = schoolRepository;
            }

            /// <summary>
            /// Get School List
            /// Get By Filtered Paged Schools with relation data 
            /// RecordStatus, InstitutionId, CityId, CountyId
            /// </summary> 
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PagedList<School>>> Handle(GetSchoolListQuery request, CancellationToken cancellationToken)
            {
                var query = _schoolRepository.Query();

                if (!request.QueryDto.AllRecords)
                {
                    if (request.QueryDto.RecordStatus)
                        query = query.Where(w => w.RecordStatus == RecordStatus.Active);
                    else
                        query = query.Where(w => w.RecordStatus == RecordStatus.Passive);
                }

                if (request.QueryDto.InstitutionId > 0)
                {
                    query = query.Where(w => w.InstitutionId == request.QueryDto.InstitutionId);
                }

                if (request.QueryDto.CityId > 0)
                {
                    query = query.Where(w => w.CityId == request.QueryDto.CityId);
                }

                if (request.QueryDto.CountyId > 0)
                {
                    query = query.Where(w => w.CountyId == request.QueryDto.CountyId);
                }

                var pagedList = await _schoolRepository.GetPagedListAsync(query, request.PaginationQuery);

                return new SuccessDataResult<PagedList<School>>(pagedList);
            }
        }
    }
}