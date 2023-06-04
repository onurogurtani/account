﻿using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]

    public class DeleteUserCommand : DeleteRequestBase<User>
    {
        public class DeleteRequestUserCommandHandler : DeleteRequestHandlerBase<User, DeleteUserCommand>
        {
            public DeleteRequestUserCommandHandler(IUserRepository repository) : base(repository)
            {
            }
        }
    }
}