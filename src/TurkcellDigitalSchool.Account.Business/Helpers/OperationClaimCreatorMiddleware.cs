using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement.Services.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Helpers
{
    public static class OperationClaimCreatorMiddleware
    {
        public static async Task UseDbOperationClaimCreator(this IApplicationBuilder app)
        {
            var operationClaimRepository = app.ApplicationServices.GetRequiredService<IOperationClaimRepository>();
            var claimDefinitionService = app.ApplicationServices.GetRequiredService<IClaimDefinitionService>();


            var claims = claimDefinitionService.GetClaimDefinitions();

            if (!claims.Any())
            {
                return;
            }
            var dbClaimList = operationClaimRepository.GetListAsync().Result.Select(s => s.Name).ToList();

            var addingClaims = claims.Select(s => new OperationClaim
            {
                Name = s.Name,
                CategoryName = s.CategoryName,
                Description = s.Description,
                ModuleType = s.ModuleType,
            }).Where(w => !dbClaimList.Contains(w.Name)).ToList();

            await operationClaimRepository.AddRangeAsync(addingClaims);
            await operationClaimRepository.SaveChangesAsync();
        }
    }
}
