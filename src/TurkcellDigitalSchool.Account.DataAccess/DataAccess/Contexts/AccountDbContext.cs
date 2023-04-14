using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts
{
    public sealed class AccountDbContext : ProjectDbContext
    {
        public AccountDbContext(ITokenHelper tokenHelper, IConfiguration configuration) : base(tokenHelper, configuration)
        {
        }
    }
}
