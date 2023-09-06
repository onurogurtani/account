using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class VisitorRegisterCommand : IRequest<IDataResult<VisitorRegisterDto>>, IUnLogable
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

        public class VisitorRegisterCommandHandler : IRequestHandler<VisitorRegisterCommand, IDataResult<VisitorRegisterDto>>
        {
            private readonly IUserRepository _userRepository;

            public VisitorRegisterCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            public async Task<IDataResult<VisitorRegisterDto>> Handle(VisitorRegisterCommand request, CancellationToken cancellationToken)
            {
                var userRecord = new User
                {
                    UserType = UserType.Admin,
                    Name = request.Name,
                    SurName = request.SurName,
                    Email = request.Email,
                    MobilePhones = request.MobilePhones,
                };

                var user = _userRepository.CreateAndSave(userRecord);

                return new SuccessDataResult<VisitorRegisterDto>(new VisitorRegisterDto
                {
                    UserId = user.Id
                });
            }

        }
    }
}
