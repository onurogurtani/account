using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserSelfQuery : IRequest<IDataResult<CurrentUserDto>>
    {
        public class GetUserSelfQueryHandler : IRequestHandler<GetUserSelfQuery, IDataResult<CurrentUserDto>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper; 
            private readonly ITokenHelper _tokenHelper;

            public GetUserSelfQueryHandler(IUserRepository userRepository, IMapper mapper, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _mapper = mapper; 
                _tokenHelper = tokenHelper;
            }

            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<CurrentUserDto>> Handle(GetUserSelfQuery request, CancellationToken cancellationToken)
            {
                long userId = _tokenHelper.GetUserIdByCurrentToken();
                var user = await _userRepository.GetAsync(p => p.Id == userId);
                var userDto = _mapper.Map<CurrentUserDto>(user);

                var  organisation = await _userRepository.Query().Include(i => i.OrganisationUsers.Where(w=>w.IsActive && !w.IsDeleted)).ThenInclude(i => i.Organisation)
                    .ThenInclude(i=>i.OrganisationType)
                    .Where(w => w.Id == userId  )
                    .SelectMany(s => s.OrganisationUsers.Select(ss => new UserOrganisation
                    {
                            Id = ss.Organisation.Id,
                            Label = ss.Organisation.Name,
                            IsSingularOrganisation = ss.Organisation.OrganisationType.IsSingularOrganisation
                        })
                    ).OrderBy(o=>o.IsSingularOrganisation).ThenBy(o=>o.Label).ToListAsync();

                 
                userDto.Claims  =   _userRepository.GetClaims(userId).Select(s=>s.Name).ToList();
                userDto.UserOrganisation = organisation;
                return new SuccessDataResult<CurrentUserDto>(userDto);
            }
        }
    }
}
