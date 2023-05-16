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
    public class GetUserDtoQuery : IRequest<IDataResult<UserDto>>
    {
        public long Id { get; set; }

        public class GetUserDtoQueryHandler : IRequestHandler<GetUserDtoQuery, IDataResult<UserDto>>
        {
            private readonly AccountDbContext _accountDbContext;

            public GetUserDtoQueryHandler(IUserRepository userRepository, IMapper mapper, AccountDbContext accountDbContext)
            {
                _accountDbContext = accountDbContext;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation]
            public virtual async Task<IDataResult<UserDto>> Handle(GetUserDtoQuery request, CancellationToken cancellationToken)
            {
                var userDto = (from u in _accountDbContext.Users
                               join p in _accountDbContext.UserPackages on u.Id equals p.UserId into users
                               from pj in users.DefaultIfEmpty()
                               where u.Id == request.Id
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
                                   UpdateTime = u.UpdateTime,
                                   BirthDate = u.BirthDate,
                                   BirthPlace = u.BirthPlace,
                                   ContactByCall = u.ContactByCall,
                                   ContactByMail = u.ContactByMail,
                                   ContactBySMS = u.ContactBySMS,
                                   ResidenceCityId = u.ResidenceCityId,
                                   ResidenceCountyId = u.ResidenceCountyId,
                                   UserName = u.UserName,
                                   UserTypeId = u.UserType,
                                   AvatarId = u.AvatarId,
                               })
                    .FirstOrDefault();

                return new SuccessDataResult<UserDto>(userDto);
            }
        }
    }
}