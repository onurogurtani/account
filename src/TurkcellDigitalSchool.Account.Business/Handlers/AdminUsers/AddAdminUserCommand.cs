﻿using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AdminUsers
{
    /// <summary>
    /// Add User
    /// </summary>
    [TransactionScope]
    [LogScope] 
    public class AddAdminUserCommand : IRequest<IDataResult<SelectionItem>>
    {
        public UserType UserTypeId { get; set; }
        public long CitizenId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string UserName { get; set; }

        [MessageClassAttr("Kullanıcı Ekleme")]
        public class AddAdminUserCommandHandler : IRequestHandler<AddAdminUserCommand, IDataResult<SelectionItem>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
            private readonly ConfigurationManager _configurationManager;
            private readonly IMediator _mediator;
            private readonly ICapPublisher _capPublisher;

            public AddAdminUserCommandHandler(IUserRepository userRepository, Microsoft.Extensions.Configuration.IConfiguration configuration,
                ConfigurationManager configurationManager, IMediator mediator, IUserRoleRepository userRoleRepository, ICapPublisher capPublisher)
            {
                _userRepository = userRepository;
                _configuration = configuration;
                _configurationManager = configurationManager;
                _mediator = mediator;
                _userRoleRepository = userRoleRepository;
                _capPublisher = capPublisher;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string Added = Messages.Added;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string UserInformations = Constants.Messages.UserInformations;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string CitizenIdAlreadyExist = Messages.CitizenIdAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string EmailAlreadyExist = Messages.EmailAlreadyExist;

            public async Task<IDataResult<SelectionItem>> Handle(AddAdminUserCommand request, CancellationToken cancellationToken)
            {

                var roleId = await _mediator.Send(new CreateAdminRoleCommand());

                var citizenIdCheck = await _userRepository.GetAsync(
                    w => w.Status && (
                    w.CitizenId == Convert.ToInt64(request.CitizenId) ||
                    w.Email == request.Email
                    ));

                if (citizenIdCheck != null)
                {
                    if (citizenIdCheck.CitizenId == Convert.ToInt64(request.CitizenId))
                        return new ErrorDataResult<SelectionItem>(CitizenIdAlreadyExist.PrepareRedisMessage());
                    if (citizenIdCheck.Email == request.Email)
                        return new ErrorDataResult<SelectionItem>(EmailAlreadyExist.PrepareRedisMessage());
                }


                HashingHelper.CreatePasswordHash(request.Password.ToString(), out var passwordSalt, out var passwordHash);

                var user = new User
                {
                    Name = request.Name,
                    SurName = request.SurName,
                    UserName = request.UserName,
                    UserType = request.UserTypeId,
                    CitizenId = request.CitizenId,
                    Email = request.Email,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    Status = true,
                    RegisterStatus = RegisterStatus.Registered
                };

                if (request.UserTypeId == UserType.OrganisationAdmin || request.UserTypeId == UserType.FranchiseAdmin)
                {
                    user.UserName = request.CitizenId.ToString();
                }
                _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();
                await _capPublisher.PublishAsync(user.GeneratePublishName(EntityState.Added), user, cancellationToken: cancellationToken);

                var userRole = new UserRole { UserId = user.Id, RoleId = roleId };
                _userRoleRepository.Add(userRole);
                await _userRoleRepository.SaveChangesAsync();

                return new SuccessDataResult<SelectionItem>(Added.PrepareRedisMessage());
            }
        }
    }
}

