using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    public class UpdateCurentUserInformationCommand : IRequest<IResult>
    {
        public string NameSurname { get; set; }
        public string MobilePhones { get; set; }
        public string ResidenceCounty { get; set; }
        public string ResidenceCity { get; set; }
        public string School { get; set; }
        public string Institution { get; set; }

        public class UpdateCurentUserInformationCommandHandler : IRequestHandler<UpdateCurentUserInformationCommand, IResult>
        {
            private readonly IUserRepository _userRepository; 
            private readonly IEducationRepository _educationRepository;
            private readonly IMapper _mapper;
            private readonly ITokenHelper _tokenHelper;

            public UpdateCurentUserInformationCommandHandler(IUserRepository userRepository,  IEducationRepository educationRepository, IMapper mapper, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository; 
                _educationRepository = educationRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper;
            }

            /// <summary>
            /// Update Curent User Information
            /// </summary>
            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IResult> Handle(UpdateCurentUserInformationCommand request, CancellationToken cancellationToken)
            {
                long userId = _tokenHelper.GetUserIdByCurrentToken();
                var userEntity = await _userRepository.GetAsync(p => p.Id == userId);

                if (userEntity.UserTypeEnum ==UserTypeEnum.Student)
                {
                    userEntity.NameSurname = request.NameSurname;
                    userEntity.ResidenceCounty = request.ResidenceCounty;
                    userEntity.ResidenceCity = request.ResidenceCity;
                    userEntity.MobilePhones = request.MobilePhones;

                    //var education = await _educationRepository.GetAsync(x => x.UserId == userId);
                    //if (!string.IsNullOrEmpty(request.Institution))
                    //    education.Institution = request.Institution;
                    //if (!string.IsNullOrEmpty(request.School))
                    //    education.School = request.School;
                    //_educationRepository.Update(education);
                    //await _educationRepository.SaveChangesAsync();
                }
                else if (userEntity.UserTypeEnum == UserTypeEnum.Parent)
                {
                    userEntity.NameSurname = request.NameSurname;
                    userEntity.MobilePhones = request.MobilePhones;
                }

                _userRepository.Update(userEntity);
                await _userRepository.SaveChangesAsync();

                return new SuccessResult(Messages.SuccessfulOperation);
            }

        }
    }
}