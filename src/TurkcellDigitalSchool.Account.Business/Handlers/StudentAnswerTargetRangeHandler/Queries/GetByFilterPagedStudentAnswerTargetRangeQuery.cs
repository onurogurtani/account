using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Queries
{
    public class GetByFilterPagedStudentAnswerTargetRangeQuery : IRequest<IDataResult<PagedList<StudentAnswerTargetRangeResponse>>>
    {
        public StudentAnswerTargetRangeDetailSearch StudentAnswerTargetRangeDetailSearch { get; set; }

        public class GetByFilterPagedStudentAnswerTargetRangeQueryHandler : IRequestHandler<GetByFilterPagedStudentAnswerTargetRangeQuery, IDataResult<PagedList<StudentAnswerTargetRangeResponse>>>
        {
            IMapper _mapper;
            IStudentAnswerTargetRangeRepository _studentAnswerTargetRangeRepository;
            /// <summary>
            /// Get By Filter Paged StudentAnswerTargetRangeQuery
            /// </summary>
            /// <param name="studentAnswerTargetRangeRepository"></param>
            /// <param name="mapper"></param>
            public GetByFilterPagedStudentAnswerTargetRangeQueryHandler(IStudentAnswerTargetRangeRepository studentAnswerTargetRangeRepository, IMapper mapper)
            {
                _studentAnswerTargetRangeRepository = studentAnswerTargetRangeRepository;
                _mapper = mapper;
            }

            public virtual async Task<IDataResult<PagedList<StudentAnswerTargetRangeResponse>>> Handle(GetByFilterPagedStudentAnswerTargetRangeQuery request, CancellationToken cancellationToken)
            {
                var query = _studentAnswerTargetRangeRepository.Query().Include(x=>x.Package).AsQueryable();

                if (request.StudentAnswerTargetRangeDetailSearch != null)
                {
                    if (request.StudentAnswerTargetRangeDetailSearch.Id != 0)
                        query = query.Where(x => x.Id == request.StudentAnswerTargetRangeDetailSearch.Id);

                    if (request.StudentAnswerTargetRangeDetailSearch.UserId != 0)
                        query = query.Where(x => x.UserId == request.StudentAnswerTargetRangeDetailSearch.UserId);

                    if (request.StudentAnswerTargetRangeDetailSearch.PackageId != 0)
                        query = query.Where(x => x.PackageId == request.StudentAnswerTargetRangeDetailSearch.PackageId);

                    switch (request.StudentAnswerTargetRangeDetailSearch.OrderBy)
                    {
                        case "idDESC":
                            query = query.OrderByDescending(x => x.Id);
                            break;
                        case "idASC":
                            query = query.OrderBy(x => x.Id);
                            break;

                        case "packageNameASC":
                            query = query.OrderBy(x => x.Package.Name.ToUpper());
                            break;
                        case "packageNameDESC":
                            query = query.OrderByDescending(x => x.Package.Name.ToUpper());
                            break;
                        default:
                            query = query.OrderByDescending(x => x.UpdateTime == null ? x.InsertTime : x.UpdateTime);
                            break;
                    }
                }

                var listItems = await query.Skip((request.StudentAnswerTargetRangeDetailSearch.PageNumber - 1) * request.StudentAnswerTargetRangeDetailSearch.PageSize)
                   .Take(request.StudentAnswerTargetRangeDetailSearch.PageSize).Where(w => w.IsDeleted == IsDeletedEnum.NotDeleted && w.Package.IsDeleted == IsDeletedEnum.NotDeleted)
                   .ToListAsync();

                var mappingResponse = _mapper.Map<List<StudentAnswerTargetRangeResponse>>(listItems);

                var pagedList = new PagedList<StudentAnswerTargetRangeResponse>(mappingResponse, query.Count(), request.StudentAnswerTargetRangeDetailSearch.PageNumber, request.StudentAnswerTargetRangeDetailSearch.PageSize);


                return new SuccessDataResult<PagedList<StudentAnswerTargetRangeResponse>>(pagedList);

            }
        }
    }
}
