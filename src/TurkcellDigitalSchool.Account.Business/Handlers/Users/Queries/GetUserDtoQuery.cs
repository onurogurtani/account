using AutoMapper;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    ///<summary>
    ///Get Filtered Paged Users
    /// </summary>
    [LogScope]
    [SecuredOperation]
    public class GetUserDtoQuery : IRequest<DataResult<UserDto>>
    {
        public long Id { get; set; }

        public class GetUserDtoQueryHandler : IRequestHandler<GetUserDtoQuery, DataResult<UserDto>>
        {
            private readonly AccountDbContext _accountDbContext;

            public GetUserDtoQueryHandler(IUserRepository userRepository, IMapper mapper, AccountDbContext accountDbContext)
            {
                _accountDbContext = accountDbContext;
            }

            public virtual async Task<DataResult<UserDto>> Handle(GetUserDtoQuery request, CancellationToken cancellationToken)
            {
                var userDto = (from u in _accountDbContext.Users
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
                                   ExamKind = u.ExamKind,
                                   UserType = u.UserType,
                                   ViewMyData = u.ViewMyData,
                                   IsPackageBuyer = (_accountDbContext.UserPackages.Any(w => w.UserId == u.Id)),
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