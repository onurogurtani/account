using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.Admin;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands
{
    /// <summary>
    /// Create Admin User with Groups
    /// </summary>
    public class CreateAdminCommand : IRequest<IResult>
    {
        public CreateUpdateAdminDto Admin { get; set; }


        public class CreateAdminCommandHandler : IRequestHandler<CreateAdminCommand, IResult>
        {
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly ITokenHelper _tokenHelper;

            public CreateAdminCommandHandler(IUserRoleRepository userRoleRepository, IUserRepository userRepository, ITokenHelper tokenHelper, IMapper mapper)
            {
                _userRepository = userRepository;
                _userRoleRepository = userRoleRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateAdminValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateAdminCommand request, CancellationToken cancellationToken)
            {
                long currentuserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentuserId);

                if (currentUser.UserType == null)
                    return new ErrorResult(Messages.AutorizationRoleError);

                if (currentUser.UserType == UserType.OrganisationAdmin)
                    request.Admin.AdminTypeEnum = AdminTypeEnum.OrganisationAdmin;

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


                var password = request.Admin.CitizenId[^6..];
                HashingHelper.CreatePasswordHash(password, out var passwordSalt, out var passwordHash);

                var user = _mapper.Map<CreateUpdateAdminDto, User>(request.Admin);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

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

