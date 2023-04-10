using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;

namespace TurkcellDigitalSchool.IdentityServerService
{
    public static class Config
    {
        public static IEnumerable<ApiResource> ApiResources =>
            new List<ApiResource>
            {
                new ApiResource(IdentityServerConst.API_RESOURCE_ACCOUNT)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_ACCOUNT  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_ACCOUNT)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_EDUCATION)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_EDUCATION },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_EDUCATION)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_EVENT)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_EVENT  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_EVENT)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_EXAM)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_EXAM},
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_EVENT)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_EXAM)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_EXAM  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_EXAM)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_FILE)
                {
                    Scopes =
                        { IdentityServerConst.API_RESOURCE_FILE },
                    ApiSecrets = new[]
                    {
                        new Secret(
                            ("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_FILE)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_REPORTING)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_REPORTING  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_REPORTING)
                            .Sha256())
                    }
                }
            };

        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
        new(){Name = IdentityServerConst.IDENTITY_RESOURCE_USER_ORGANISATION,DisplayName = IdentityServerConst.IDENTITY_RESOURCE_USER_ORGANISATION, Description = "Kullanıcının yetkili olduğu kurumlar", UserClaims  = new []{ IdentityServerConst.IDENTITY_RESOURCE_USER_ORGANISATION } },
          new(){Name = IdentityServerConst.IDENTITY_RESOURCE_USER_ALL_TYPES,DisplayName = IdentityServerConst.IDENTITY_RESOURCE_USER_ALL_TYPES, Description = "Kullanıcının Admin ve User Type bilgilerini barındırır ", UserClaims  = new []{ IdentityServerConst.IDENTITY_RESOURCE_USER_ADMIN_TYPE, IdentityServerConst.IDENTITY_RESOURCE_USER_TYPE } },
          new(){Name = IdentityServerConst.IDENTITY_RESOURCE_USER_SESSININFO,DisplayName = IdentityServerConst.IDENTITY_RESOURCE_USER_SESSININFO, Description = "Kullanıcı session bilgileri", UserClaims  = new []{ IdentityServerConst.IDENTITY_RESOURCE_SESSION_TYPE, IdentityServerConst.IDENTITY_RESOURCE_SESSION_ID } },
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope(IdentityServerConst.API_RESOURCE_ACCOUNT),
                new ApiScope(IdentityServerConst.API_RESOURCE_EDUCATION),
                new ApiScope(IdentityServerConst.API_RESOURCE_EVENT),
                new ApiScope(IdentityServerConst.API_RESOURCE_EXAM),
                new ApiScope(IdentityServerConst.API_RESOURCE_FILE),
                new ApiScope(IdentityServerConst.API_RESOURCE_REPORTING)
            };
        public static IEnumerable<Client> Clients =>
            new Client[]
            {
            new Client
            {
                ClientId =  IdentityServerConst.CLIENT_DIDE_WEB,
                ClientName = "Dijital Dershane Web",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                AllowedScopes = {IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.Email,
                    IdentityServerConst.IDENTITY_RESOURCE_USER_ORGANISATION,
                    IdentityServerConst.IDENTITY_RESOURCE_USER_ALL_TYPES,
                    IdentityServerConst.IDENTITY_RESOURCE_USER_SESSININFO,
                    IdentityServerConstants.StandardScopes.OfflineAccess,
                    IdentityServerConst.API_RESOURCE_ACCOUNT,
                    IdentityServerConst.API_RESOURCE_EDUCATION,
                    IdentityServerConst.API_RESOURCE_EVENT,
                    IdentityServerConst.API_RESOURCE_EXAM,
                    IdentityServerConst.API_RESOURCE_FILE,
                    IdentityServerConst.API_RESOURCE_REPORTING
                },
                AccessTokenLifetime =(int)(DateTime.Now.AddDays(30)-DateTime.Now).TotalSeconds,
                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                AbsoluteRefreshTokenLifetime = (int)(DateTime.Now.AddDays(60)-DateTime.Now).TotalSeconds,
                RequireClientSecret = false
            },
             new Client
            {
                ClientId = IdentityServerConst.CLIENT_DIDE_MOBILE,
                ClientName = "Dijital Dershane Mobile App",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                AllowedScopes = {IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.Email,
                    IdentityServerConst.IDENTITY_RESOURCE_USER_ORGANISATION,
                    IdentityServerConst.IDENTITY_RESOURCE_USER_ALL_TYPES,
                    IdentityServerConst.IDENTITY_RESOURCE_USER_SESSININFO,
                    IdentityServerConstants.StandardScopes.OfflineAccess,
                    IdentityServerConst.API_RESOURCE_ACCOUNT,
                    IdentityServerConst.API_RESOURCE_EDUCATION,
                    IdentityServerConst.API_RESOURCE_EVENT,
                    IdentityServerConst.API_RESOURCE_EXAM,
                    IdentityServerConst.API_RESOURCE_FILE,
                    IdentityServerConst.API_RESOURCE_REPORTING},
                AccessTokenLifetime =(int)(DateTime.Now.AddDays(60)-DateTime.Now).TotalSeconds,
                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                AbsoluteRefreshTokenLifetime = (int)(DateTime.Now.AddDays(90)-DateTime.Now).TotalSeconds,
                RequireClientSecret = false
            }};
    }
}