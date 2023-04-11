﻿using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    /// <summary>
    /// Add User
    /// </summary>
    public class AddUserCommand : IRequest<IDataResult<SelectionItem>>
    {
        public UserType UserTypeId { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

        [MessageClassAttr("Kullanıcı Ekleme")]
        public class AddUserCommandHandler : IRequestHandler<AddUserCommand, IDataResult<SelectionItem>>
        {
            private readonly IUserRepository _userRepository;
            private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
            private readonly ConfigurationManager _configurationManager;

            public AddUserCommandHandler(IUserRepository userRepository, Microsoft.Extensions.Configuration.IConfiguration configuration, ConfigurationManager configurationManager)
            {
                _userRepository = userRepository;
                _configuration = configuration;
                _configurationManager = configurationManager;
            }

            [MessageConstAttr(MessageCodeType.Success)]
            private static string Added = Messages.Added;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string UserInformations = Constants.Messages.UserInformations;

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(AddUserValidator), Priority = 2)]
            public async Task<IDataResult<SelectionItem>> Handle(AddUserCommand request, CancellationToken cancellationToken)
            {
                int randomPassword = RandomPassword.RandomNumberGenerator();
                if (_configurationManager.Mode == ApplicationMode.DEV || _configurationManager.Mode == ApplicationMode.STB)
                    randomPassword = 123456;
                HashingHelper.CreatePasswordHash(randomPassword.ToString(), out var passwordSalt, out var passwordHash);

                var user = new User
                {
                    CitizenId = request.CitizenId,
                    Name = request.Name,
                    SurName = request.SurName,
                    Email = request.Email,
                    MobilePhones = request.MobilePhones,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    UserType = request.UserTypeId,
                    Status = true,
                    RegisterStatus = RegisterStatus.Registered
                };

                _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();

                var link = _configuration.GetSection("PathSetting").GetSection("UserLink").Value;
                var messageContent = string.Format(UserInformations, request.Name, request.SurName, randomPassword, link);

                return new SuccessDataResult<SelectionItem>(new SelectionItem { Label = messageContent }, Added.PrepareRedisMessage());
            }
        }
    }
}

