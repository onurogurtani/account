﻿using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [TransactionScope]
    [LogScope] 
    public class UpdateCurentUserInformationCommand : IRequest<IResult> , IUnLogable
    {
        public string NameSurname { get; set; }
        public string MobilePhones { get; set; }
        public long ResidenceCountyId { get; set; }
        public long ResidenceCityId { get; set; }
        public string School { get; set; }
        public string Institution { get; set; }

        [MessageClassAttr("Şuanki Kullanıcı Bilgisi Güncelleme")]
        public class UpdateCurentUserInformationCommandHandler : IRequestHandler<UpdateCurentUserInformationCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IEducationRepository _educationRepository;
            private readonly IMapper _mapper;
            private readonly ITokenHelper _tokenHelper; 

            public UpdateCurentUserInformationCommandHandler(IUserRepository userRepository, IEducationRepository educationRepository, IMapper mapper, ITokenHelper tokenHelper )
            {
                _userRepository = userRepository;
                _educationRepository = educationRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper; 
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            /// <summary>
            /// Update Curent User Information
            /// </summary>
            
            public async Task<IResult> Handle(UpdateCurentUserInformationCommand request, CancellationToken cancellationToken)
            {
                long userId = _tokenHelper.GetUserIdByCurrentToken();
                var userEntity = await _userRepository.GetAsync(p => p.Id == userId);

                if (userEntity.UserType == UserType.Student)
                {
                    userEntity.NameSurname = request.NameSurname;
                    userEntity.ResidenceCountyId = request.ResidenceCountyId;
                    userEntity.ResidenceCityId = request.ResidenceCityId;
                    userEntity.MobilePhones = request.MobilePhones;

                    //var education = await _educationRepository.GetAsync(x => x.UserId == userId);
                    //if (!string.IsNullOrEmpty(request.Institution))
                    //    education.Institution = request.Institution;
                    //if (!string.IsNullOrEmpty(request.School))
                    //    education.School = request.School;
                    //_educationRepository.Update(education);
                    //await _educationRepository.SaveChangesAsync();
                }
                else if (userEntity.UserType == UserType.Parent)
                {
                    userEntity.NameSurname = request.NameSurname;
                    userEntity.MobilePhones = request.MobilePhones;
                }

                _userRepository.Update(userEntity);
                await _userRepository.SaveChangesAsync(); 
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}