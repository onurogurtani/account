using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    [PerformanceScope]
    [LogScope]

    public class GetUserSelfQuery : IRequest<DataResult<CurrentUserDto>>
    {
        public class GetUserSelfQueryHandler : IRequestHandler<GetUserSelfQuery, DataResult<CurrentUserDto>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IFileRepository _fileRepository;
            private readonly IMapper _mapper;
            private readonly ITokenHelper _tokenHelper;
            private readonly IMediator _mediator;

            public GetUserSelfQueryHandler(IUserRepository userRepository, IFileRepository fileRepository, IMapper mapper, ITokenHelper tokenHelper, IMediator mediator)
            {
                _userRepository = userRepository;
                _fileRepository = fileRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper;
                _mediator = mediator;
            }

            public async Task<DataResult<CurrentUserDto>> Handle(GetUserSelfQuery request, CancellationToken cancellationToken)
            {
                long userId = _tokenHelper.GetUserIdByCurrentToken();
                var user = await _userRepository.GetAsync(p => p.Id == userId);
                var userDto = _mapper.Map<CurrentUserDto>(user);


                userDto.PackageStatus= await _mediator.Send(new GetPackageInformationForUserQuery { UserId = userId });
                userDto.AvatarPath = user?.AvatarId > 0 ? _fileRepository.Query().FirstOrDefault(g => g.Id == user.AvatarId)?.FilePath : "";

                var  organisation = await _userRepository.Query().Include(i => i.OrganisationUsers.Where(w=>w.IsActive && !w.IsDeleted)).ThenInclude(i => i.Organisation)
                    .ThenInclude(i=>i.OrganisationType)
                    .Where(w => w.Id == userId  )
                    .SelectMany(s => s.OrganisationUsers.Select(ss => new UserOrganisation
                    {
                        Id = ss.Organisation.Id,
                        Label = ss.Organisation.Name,
                        IsSingularOrganisation = ss.Organisation.OrganisationType.IsSingularOrganisation
                    })
                    ).OrderBy(o=>o.IsSingularOrganisation).ThenBy(o=>o.Label).ToListAsync(cancellationToken);


                userDto.Claims  =   _userRepository.GetClaims(userId).Select(s=>s.Name).ToList();
                userDto.UserOrganisation = organisation;
                return new SuccessDataResult<CurrentUserDto>(userDto);
            }
        }
    }
}
