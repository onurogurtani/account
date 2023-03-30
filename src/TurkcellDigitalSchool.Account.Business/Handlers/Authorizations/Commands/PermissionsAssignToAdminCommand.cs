using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class PermissionsAssignToAdminCommand : IRequest<IResult>
    {
        public class PermissionsAssignToAdminCommandHandler : IRequestHandler<PermissionsAssignToAdminCommand, IResult>
        {
            private readonly ITokenHelper _tokenHelper;
            private readonly IConfiguration _configuration;

            public PermissionsAssignToAdminCommandHandler(ITokenHelper tokenHelper, IConfiguration configuration)
            {
                _tokenHelper = tokenHelper;
                _configuration = configuration;
            }

            public async Task<IResult> Handle(PermissionsAssignToAdminCommand request, CancellationToken cancellationToken)
            {
                var optionBuilder = new DbContextOptionsBuilder<ProjectDbContext>();
                optionBuilder.UseNpgsql(_configuration.GetConnectionString("DArchPostgreContext"));
                var context = new ProjectDbContext(optionBuilder.Options, _tokenHelper);
                var affectedRows = context.Database.ExecuteSqlRaw(@"
insert into ""RoleClaims"" (""RoleId"", ""ClaimName"",""IsDeleted"")
select 1 RoleId,oc.""Name"" ""ClaimName""  , false ""IsDeleted""  
from ""OperationClaims"" oc  where  not exists (select * from  ""RoleClaims"" rc  where rc.""ClaimName"" = oc.""Name"")");
                return new SuccessResult($"{affectedRows} kayýt eklendi");
            }
        }
    }
}