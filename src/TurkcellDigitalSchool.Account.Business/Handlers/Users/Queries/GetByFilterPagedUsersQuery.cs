using AutoMapper;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
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
    public class GetByFilterPagedUsersQuery : IRequest<IDataResult<PagedList<UserDto>>>
    {
        public UserDetailSearch UserDetailSearch { get; set; } = new UserDetailSearch();

        public class GetByFilterPagedUsersQueryHandler : IRequestHandler<GetByFilterPagedUsersQuery, IDataResult<PagedList<UserDto>>>
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

           
            [SecuredOperation]
            public virtual async Task<IDataResult<PagedList<UserDto>>> Handle(GetByFilterPagedUsersQuery request, CancellationToken cancellationToken)
            {
                var query = (from u in _accountDbContext.Users
                             join p in _accountDbContext.UserPackages on u.Id equals p.UserId into users
                             from pj in users.DefaultIfEmpty()
                             select new UserDto
                             {
                                 CitizenId = u.CitizenId,
                                 Email = u.Email,
                                 Id = u.Id,
                                 Name = u.Name,
                                 MobilePhones = u.MobilePhones,
                                 Status = u.Status,
                                 SurName = u.SurName,
                                 UserType = u.UserType,
                                 ViewMyData = u.ViewMyData,
                                 IsPackageBuyer = pj.Id > 0,
                                 RegisterStatus = u.RegisterStatus,
                                 InsertTime = u.InsertTime,
                                 UpdateTime = u.UpdateTime
                             }).Where(
                    x => x.UserType != UserType.Admin && x.UserType != UserType.OrganisationAdmin
                    && x.UserType != UserType.FranchiseAdmin && x.RegisterStatus == RegisterStatus.Registered)
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
                    query = query.Where(x => x.UserType == request.UserDetailSearch.UserTypeId);

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
                        query = query.OrderByDescending(x => x.UserType);
                        break;
                    case "UserTypeIdASC":
                        query = query.OrderBy(x => x.UserType);
                        break;
                }

                query = query.OrderByDescending(x => x.UpdateTime == null ? x.InsertTime : x.UpdateTime);

                var items = query.ToList();

                PagedList<UserDto> pagedDtoList = items.AsQueryable().ToPagedList(new PaginationQuery { PageNumber = request.UserDetailSearch.PageNumber, PageSize = request.UserDetailSearch.PageSize });
                return new SuccessDataResult<PagedList<UserDto>>(pagedDtoList);
            }
        }
    }
}