﻿using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserPackagesQuery : QueryByFilterRequestBase<UserPackage>
    {
        public class GetUserPackagesQueryHandler : QueryByFilterRequestHandlerBase<UserPackage>
        {
            public GetUserPackagesQueryHandler(IUserPackageRepository repository) : base(repository)
            {
            }
        }
    }
}