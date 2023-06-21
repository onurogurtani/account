﻿using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteUserPackageCommand : DeleteRequestBase<UserPackage>
    {
        public class DeleteRequestUserPackageCommandHandler : DeleteRequestHandlerBase<UserPackage, DeleteUserPackageCommand>
        {
            public DeleteRequestUserPackageCommandHandler(IUserPackageRepository repository) : base(repository)
            {
            }
        }
    }
}

