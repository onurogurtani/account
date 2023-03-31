using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    ///<summary>
    ///Get Filtered Paged Users
    /// </summary>
    public class GetByFilterPagedUsersQuery : IRequest<IDataResult<PagedList<UserDto>>>
    {
        public UserDetailSearch UserDetailSearch { get; set; } = new UserDetailSearch();

        public class GetByFilterPagedUsersQueryHandler : IRequestHandler<GetByFilterPagedUsersQuery, IDataResult<PagedList<UserDto>>>
        {
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;

            public GetByFilterPagedUsersQueryHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<PagedList<UserDto>>> Handle(GetByFilterPagedUsersQuery request, CancellationToken cancellationToken)
            {                
                var query = _userRepository.Query().Where(x => x.UserTypeEnum != null && x.UserTypeEnum > 0 && x.RegisterStatus == RegisterStatus.Registered)
                    .AsQueryable();

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.Name))
                    query = query.Where(x => x.Name.Contains(request.UserDetailSearch.Name));

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.SurName))
                    query = query.Where(x => x.SurName.Contains(request.UserDetailSearch.SurName));

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.Email))
                    query = query.Where(x => x.Email.Contains(request.UserDetailSearch.Email));

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.MobilePhones))
                    query = query.Where(x => x.MobilePhones.Contains(request.UserDetailSearch.MobilePhones));

                if (request.UserDetailSearch.UserTypeId > 0)
                    query = query.Where(x => x.UserTypeEnum == request.UserDetailSearch.UserTypeId);

                if (request.UserDetailSearch.CitizenId > 0)
                    query = query.Where(x => x.CitizenId == request.UserDetailSearch.CitizenId);

                switch (request.UserDetailSearch.OrderBy)
                {
                    case "NameASC":
                        query = query.OrderBy(x => x.Name);
                        break;
                    case "NameDESC":
                        query = query.OrderByDescending(x => x.Name);
                        break;
                    case "SurNameASC":
                        query = query.OrderBy(x => x.SurName);
                        break;
                    case "SurNameDESC":
                        query = query.OrderByDescending(x => x.SurName);
                        break;
                    case "EmailASC":
                        query = query.OrderBy(x => x.Email);
                        break;
                    case "EmailDESC":
                        query = query.OrderByDescending(x => x.Email);
                        break;
                    case "MobilePhonesDESC":
                        query = query.OrderByDescending(x => x.MobilePhones);
                        break;
                    case "MobilePhonesASC":
                        query = query.OrderBy(x => x.MobilePhones);
                        break;
                    case "CitizenIdDESC":
                        query = query.OrderByDescending(x => x.CitizenId);
                        break;
                    case "CitizenIdASC":
                        query = query.OrderBy(x => x.CitizenId);
                        break;
                    case "UserTypeIdDESC":
                        query = query.OrderByDescending(x => x.UserTypeEnum);
                        break;
                    case "UserTypeIdASC":
                        query = query.OrderBy(x => x.UserTypeEnum);
                        break;
                }

                query = query.OrderByDescending(x => x.UpdateTime == null ? x.InsertTime : x.UpdateTime);

                var items = _mapper.Map<List<User>, List<UserDto>>(query.ToList());

                PagedList<UserDto> pagedDtoList = items.AsQueryable().GetPagedList(new PaginationQuery { PageNumber = request.UserDetailSearch.PageNumber, PageSize = request.UserDetailSearch.PageSize});
                return new SuccessDataResult<PagedList<UserDto>>(pagedDtoList);
            }
        }
    }
}