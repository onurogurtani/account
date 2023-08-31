﻿using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Common;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    /// <summary>
    /// Add User
    /// </summary>
    [LogScope]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.IndividualMemberListAdd })]
    public class AddUserCommand : IRequest<DataResult<SelectionItem>> , IUnLogable
    {
        public UserType UserTypeId { get; set; }
        public long? CitizenId { get; set; }
        public string BirthPlace { get; set; }
        public DateTime BirthDate { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string UserName { get; set; }
        public long? ResidenceCityId { get; set; }
        public long? ResidenceCountyId { get; set; }
        public bool ContactBySMS { get; set; }
        public bool ContactByMail { get; set; }
        public bool ContactByCall { get; set; }

        [MessageClassAttr("Kullanıcı Ekleme")]
        public class AddUserCommandHandler : IRequestHandler<AddUserCommand, DataResult<SelectionItem>>
        {
            private readonly IUserRepository _userRepository;
            private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
            private readonly ConfigurationManager _configurationManager;
            private readonly IMailService _mailService;

            public AddUserCommandHandler(IMailService mailService, IUserRepository userRepository, Microsoft.Extensions.Configuration.IConfiguration configuration, ConfigurationManager configurationManager)
            {
                _userRepository = userRepository;
                _configuration = configuration;
                _configurationManager = configurationManager;
                _mailService = mailService;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string Added = Messages.Added;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string UserInformations = Constants.Messages.NewUserMessage;

            public async Task<DataResult<SelectionItem>> Handle(AddUserCommand request, CancellationToken cancellationToken)
            {

                if (request.Email != null && _userRepository.GetCountAsync(w => w.Email.Trim().ToLower() == request.Email.Trim().ToLower()).Result > 0)
                {
                    return new ErrorDataResult<SelectionItem>("Mail adresi daha önce kullanılmış.");
                }
                else if (request.MobilePhones != null && _userRepository.GetCountAsync(w => w.MobilePhones.Trim().ToLower() == request.MobilePhones.Trim().ToLower()).Result > 0)
                {
                    return new ErrorDataResult<SelectionItem>("Telefon numarası daha önce kullanılmış.");
                }

                int randomPassword = RandomPassword.RandomNumberGenerator();
                if (_configurationManager.Mode == ApplicationMode.DEV  )
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
                    RegisterStatus = RegisterStatus.Registered,
                    BirthDate = request.BirthDate,
                    BirthPlace = request.BirthPlace,
                    ResidenceCityId = request.ResidenceCityId,
                    ResidenceCountyId = request.ResidenceCountyId,
                    UserName = request.UserName,
                    ContactBySMS = request.ContactBySMS,
                    ContactByMail = request.ContactByMail,
                    ContactByCall = request.ContactByCall
                };

                _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();

                var messageContent = string.Format(UserInformations, request.Email, randomPassword);

                await _mailService.Send(new EmailMessage
                {
                    Subject = Constants.Messages.NewUserSubject,
                    ToAddresses = new System.Collections.Generic.List<EmailAddress> { new EmailAddress { Address = user.Email } },
                    Content = messageContent
                });

                return new SuccessDataResult<SelectionItem>(new SelectionItem { Label = messageContent }, Added.PrepareRedisMessage());
            }

        }
    }
}
