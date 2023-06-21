using AutoMapper;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    ///<summary>
    ///Get Filtered Paged Users
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class GetByFilterPagedUsersQuery : IRequest<DataResult<PagedList<UserDto>>>
    {
        public UserDetailSearch UserDetailSearch { get; set; } = new UserDetailSearch();

        public class GetByFilterPagedUsersQueryHandler : IRequestHandler<GetByFilterPagedUsersQuery, DataResult<PagedList<UserDto>>>
        {
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;
            private readonly AccountDbContext _accountDbContext;

            public GetByFilterPagedUsersQueryHandler(IUserRepository userRepository, IMapper mapper, AccountDbContext accountDbContext)
            {
                _userRepository = userRepository;
                _mapper = mapper;
                _accountDbContext = accountDbContext;
            }

            public virtual async Task<DataResult<PagedList<UserDto>>> Handle(GetByFilterPagedUsersQuery request, CancellationToken cancellationToken)
            {
                var query = (from u in _accountDbContext.Users
                             select new UserDto
                             {
                                 CitizenId = u.CitizenId,
                                 Email = u.Email,
                                 Id = u.Id,
                                 Name = u.Name,
                                 MobilePhones = u.MobilePhones,
                                 Status = u.Status,
                                 SurName = u.SurName,
                                 ExamKind = u.ExamKind,
                                 UserType = u.UserType,
                                 ViewMyData = u.ViewMyData,
                                 IsPackageBuyer = (_accountDbContext.UserPackages.Any(w => w.UserId == u.Id)),
                                 RegisterStatus = u.RegisterStatus,
                                 InsertTime = u.InsertTime,
                                 UpdateTime = u.UpdateTime
                             }).Where(
                    x => x.UserType != UserType.Admin && x.UserType != UserType.OrganisationAdmin
                    && x.UserType != UserType.FranchiseAdmin && x.RegisterStatus == RegisterStatus.Registered)
                    .AsQueryable();

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.Name))
                    query = query.Where(x => x.Name.ToLower().Contains(request.UserDetailSearch.Name.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.SurName))
                    query = query.Where(x => x.SurName.ToLower().Contains(request.UserDetailSearch.SurName.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.Email))
                    query = query.Where(x => x.Email.ToLower().Contains(request.UserDetailSearch.Email.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.UserDetailSearch.MobilePhones))
                    query = query.Where(x => x.MobilePhones.Contains(request.UserDetailSearch.MobilePhones));

                if (request.UserDetailSearch.UserTypeId > 0)
                    query = query.Where(x => x.UserType == request.UserDetailSearch.UserTypeId);

                if (request.UserDetailSearch.CitizenId > 0)
                    query = query.Where(x => x.CitizenId == request.UserDetailSearch.CitizenId);

                if (request.UserDetailSearch.PackageBuyStatus != null)
                    query = query.Where(x => (x.IsPackageBuyer == null) || (x.IsPackageBuyer == request.UserDetailSearch.PackageBuyStatus));

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
                        query = query.OrderByDescending(x => x.UserType);
                        break;
                    case "UserTypeIdASC":
                        query = query.OrderBy(x => x.UserType);
                        break;
                    default:
                        query = query.OrderByDescending(x => x.UpdateTime == null ? x.InsertTime : x.UpdateTime);
                        break;
                }

                var items = query.ToList();

                PagedList<UserDto> pagedDtoList = items.AsQueryable().ToPagedList(new PaginationQuery { PageNumber = request.UserDetailSearch.PageNumber, PageSize = request.UserDetailSearch.PageSize });
                return new SuccessDataResult<PagedList<UserDto>>(pagedDtoList);
            }
        }
    }
}