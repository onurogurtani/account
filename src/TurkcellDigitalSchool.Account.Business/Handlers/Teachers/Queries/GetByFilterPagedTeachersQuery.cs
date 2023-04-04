using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.TeacherDtos; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries
{
    ///<summary>
    ///Get Filtered Paged Users/Teachers with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be "NameASC","NameDESC","SurNameASC","SurNameDESC" </remarks>
    public class GetByFilterPagedTeachersQuery : IRequest<IDataResult<PagedList<GetTeachersResponseDto>>>
    {
        public PaginationQuery Pagination { get; set; } = new();

        public string Name { get; set; }
        public string SurName { get; set; }
        public string OrderBy { get; set; }

        public class GetByFilterPagedTeachersQueryHandler : IRequestHandler<GetByFilterPagedTeachersQuery, IDataResult<PagedList<GetTeachersResponseDto>>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public GetByFilterPagedTeachersQueryHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<PagedList<GetTeachersResponseDto>>> Handle(GetByFilterPagedTeachersQuery request, CancellationToken cancellationToken)
            {
                var query = _userRepository.Query();
                query = query.Where(q => q.UserType == UserType.Teacher);

                if (!string.IsNullOrEmpty(request.Name))
                    query = query.Where(q => q.Name.ToLower().Contains(request.Name.ToLower()));


                if (!string.IsNullOrEmpty(request.SurName))
                    query = query.Where(q => q.SurName.ToLower().Contains(request.SurName.ToLower()));

                query = request.OrderBy switch
                {
                    "NameASC" => query.OrderBy(q => q.Name),
                    "NameDESC" => query.OrderByDescending(q => q.Name),
                    "SurNameASC" => query.OrderBy(q => q.SurName),
                    "SurNameDESC" => query.OrderByDescending(q => q.SurName),
                    _ => query.OrderByDescending(q => q.UpdateTime),
                };

                var items = await query
                    .Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageSize)
                        .Take(request.Pagination.PageSize)
                        .ToListAsync();

                var mappedItems = _mapper.Map<List<GetTeachersResponseDto>>(items);

                var pagedList = new PagedList<GetTeachersResponseDto>(mappedItems, query.Count(), request.Pagination.PageNumber, request.Pagination.PageSize);

                return new SuccessDataResult<PagedList<GetTeachersResponseDto>>(pagedList);
            }
        }

    }
}