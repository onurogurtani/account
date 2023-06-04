﻿using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]

    public class GetUserQuery : QueryByIdRequestBase<User>
    {
        public class GetUserQueryHandler : QueryByIdRequestHandlerBase<User, GetUserQuery>
        {
            public GetUserQueryHandler(IUserRepository repository) : base(repository)
            {
            }
        }
    }
}