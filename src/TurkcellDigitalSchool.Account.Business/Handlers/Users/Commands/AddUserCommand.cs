using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
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
        public UserTypeEnum? UserTypeId { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

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
                    UserTypeEnum = request.UserTypeId,
                    Status = true,
                    RegisterStatus = RegisterStatus.Registered
                };

                _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();

                var link = _configuration.GetSection("PathSetting").GetSection("UserLink").Value;
                var messageContent = "Kullanıcı adınız: " + request.Name + " " + request.SurName + " \nŞifreniz: " + randomPassword + " şeklinde belirlenmiştir. " + link + " link üzerinden sisteme giriş yapabilirsiniz.";

                return new SuccessDataResult<SelectionItem>(new SelectionItem { Label = messageContent }, Messages.Added);
            }
        }
    }
}

