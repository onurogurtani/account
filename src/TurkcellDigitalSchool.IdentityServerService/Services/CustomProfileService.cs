using System.Security.Claims;
using System.Text.Json;
using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Microsoft.IdentityModel.JsonWebTokens;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;

namespace TurkcellDigitalSchool.IdentityServerService.Services
{
    public class CustomProfileService : IProfileService
    {
        private readonly ICustomUserSvc _customUserSvc;
        public CustomProfileService(ICustomUserSvc customUserSvc)
        {
            _customUserSvc = customUserSvc;
        }
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var subId = Convert.ToInt32(context.Subject.GetSubjectId());
            var user = await _customUserSvc.FindById(subId);
            var userOrganisation = await _customUserSvc.GetUserOrganisation(subId);
            var organisation = JsonSerializer.Serialize(userOrganisation);

            var cliamTypes = new List<string>
            {
                IdentityServerConst.IDENTITY_RESOURCE_SESSION_TYPE,
                IdentityServerConst.IDENTITY_RESOURCE_SESSION_ID,
                IdentityServerConst.IDENTITY_RESOURCE_USER_HAS_PACKAGE_ID
            };

            var addedClaimFromLogin = context.Subject.Identities.Where(w => w.Claims.Any(ww => cliamTypes.Contains(ww.Type)))
                .SelectMany(s => s.Claims.Select(ss => ss)).Where(w => cliamTypes.Contains(w.Type)).ToList();


            var claims = new List<Claim>();

            if (!string.IsNullOrEmpty(user.EMail))
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.EMail));
            }
            if (!string.IsNullOrEmpty(user.Name))
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Name, user.Name));
            }
            if (!string.IsNullOrEmpty(user.Surname))
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.FamilyName, user.Surname));
            }
            if (organisation.Any())
            {
                claims.Add(new Claim(IdentityServerConst.IDENTITY_RESOURCE_USER_ORGANISATION, organisation));
            } 

            claims.Add(new Claim(IdentityServerConst.IDENTITY_RESOURCE_USER_TYPE, user.UserType.GetHashCode().ToString()));


            foreach (var item in addedClaimFromLogin)
            {
                claims.Add(new Claim(item.Type, item.Value));
            }

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var userId = Convert.ToInt32(context.Subject.GetSubjectId());
            var user = await _customUserSvc.FindById(userId);
            context.IsActive = user != null;
        }
    }
}
