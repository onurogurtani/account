using DotNetCore.CAP;
using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Services.EntityChangeServices;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts
{
    public sealed class AccountSubscribeDbContext : AccountDbContext, ISubscribeDbContext
    {
        public AccountSubscribeDbContext(ITokenHelper tokenHelper, IConfiguration configuration, ICapPublisher capPublisher, IEntityChangeServices entityChangeServices) : base(tokenHelper,
            configuration, capPublisher, entityChangeServices)
        {
        }
    }
}