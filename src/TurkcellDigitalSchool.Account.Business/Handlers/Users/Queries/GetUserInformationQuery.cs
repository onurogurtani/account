using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    public class GetUserInformationQuery : IRequest<IDataResult<UserInformationDto>>
    {
        public class GetUserInformationQueryHandler : IRequestHandler<GetUserInformationQuery, IDataResult<UserInformationDto>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;
            private readonly ITokenHelper _tokenHelper;

            public GetUserInformationQueryHandler(IUserRepository userRepository, IMapper mapper, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper;
            }

            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<UserInformationDto>> Handle(GetUserInformationQuery request, CancellationToken cancellationToken)
            {

                return new SuccessDataResult<UserInformationDto>(userDto);
            }
        }
    }
}

