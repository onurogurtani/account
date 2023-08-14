using AutoMapper;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands
{
    /// <summary>
    /// Create Admin User with Groups
    /// </summary>
    [TransactionScope]
    [LogScope]
    // 
    public class CreateAdminCommand : IRequest<IResult>
    {
        public CreateUpdateAdminDto Admin { get; set; }


        public class CreateAdminCommandHandler : IRequestHandler<CreateAdminCommand, IResult>
        {
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly ITokenHelper _tokenHelper; 

            public CreateAdminCommandHandler(IUserRoleRepository userRoleRepository, IUserRepository userRepository, ITokenHelper tokenHelper, IMapper mapper )
            {
                _userRepository = userRepository;
                _userRoleRepository = userRoleRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper; 
            }

            public async Task<IResult> Handle(CreateAdminCommand request, CancellationToken cancellationToken)
            {
                long currentuserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentuserId);

                if (currentUser.UserType != UserType.Admin && currentUser.UserType != UserType.OrganisationAdmin && currentUser.UserType != UserType.FranchiseAdmin)
                    return new ErrorResult(Messages.AutorizationRoleError);

                if (currentUser.UserType == UserType.OrganisationAdmin || currentUser.UserType == UserType.FranchiseAdmin)
                    request.Admin.UserType = UserType.OrganisationAdmin;

                var citizenIdCheck = await _userRepository.GetAsync(
                    w => w.Status && (
                    w.CitizenId == Convert.ToInt64(request.Admin.CitizenId) ||
                    w.Email == request.Admin.Email ||
                    w.MobilePhones == request.Admin.MobilePhones
                    ));

                if (citizenIdCheck != null)
                {
                    if (citizenIdCheck.CitizenId == Convert.ToInt64(request.Admin.CitizenId))
                        return new ErrorResult(Messages.CitizenIdAlreadyExist);
                    if (citizenIdCheck.Email == request.Admin.Email)
                        return new ErrorResult(Messages.EmailAlreadyExist);
                    if (citizenIdCheck.MobilePhones == request.Admin.MobilePhones)
                        return new ErrorResult(Messages.MobilePhoneAlreadyExist);
                }

                if (request.Admin.UserType == UserType.OrganisationAdmin || request.Admin.UserType == UserType.FranchiseAdmin)
                {
                    request.Admin.UserName = request.Admin.CitizenId;
                }

                var password = request.Admin.CitizenId[^6..];
                HashingHelper.CreatePasswordHash(password, out var passwordSalt, out var passwordHash);

                var user = _mapper.Map<CreateUpdateAdminDto, User>(request.Admin);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.RegisterStatus = RegisterStatus.Registered;

                var record = _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();
                

                foreach (var roleId in request.Admin.RoleIds)
                    _userRoleRepository.Add(new UserRole { RoleId = roleId, UserId = record.Id });
                await _userRoleRepository.SaveChangesAsync();                

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

