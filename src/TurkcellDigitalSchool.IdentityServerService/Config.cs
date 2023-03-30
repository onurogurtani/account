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
                new ApiResource(IdentityServerConst.API_RESOURCE_ADMIN)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_ADMIN  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_ADMIN)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_CONTENT)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_CONTENT },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_CONTENT)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_CRM)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_CRM  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_CRM)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_EVENT)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_EVENT},
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
                new ApiResource(IdentityServerConst.API_RESOURCE_IDENTITY)
                {
                    Scopes =
                        { IdentityServerConst.API_RESOURCE_IDENTITY  },
                    ApiSecrets = new[]
                    {
                        new Secret(
                            ("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_IDENTITY)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_IYZICO)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_IYZICO  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_IYZICO)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_MEMBER)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_MEMBER },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_MEMBER)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_MESSAGING)
                {
                    Scopes =
                    {
                        IdentityServerConst.API_RESOURCE_MESSAGING
                    },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" +
                                    IdentityServerConst.API_RESOURCE_MESSAGING).Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_PAYMENT)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_PAYMENT },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_PAYMENT)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_QUESTION)
                {
                    Scopes =
                        { IdentityServerConst.API_RESOURCE_QUESTION },
                    ApiSecrets = new[]
                    {
                        new Secret(
                            ("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_QUESTION)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_REPORTING)
                {
                    Scopes =
                    {
                        IdentityServerConst.API_RESOURCE_REPORTING
                    },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" +
                                    IdentityServerConst.API_RESOURCE_REPORTING).Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_SHARED)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_SHARED },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_SHARED)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_SURVEY)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_SURVEY  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_SURVEY)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_TARGET)
                {
                    Scopes = { IdentityServerConst.API_RESOURCE_TARGET  },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" + IdentityServerConst.API_RESOURCE_TARGET)
                            .Sha256())
                    }
                },
                new ApiResource(IdentityServerConst.API_RESOURCE_VCONFERENCE)
                {
                    Scopes =
                    {
                        IdentityServerConst.API_RESOURCE_VCONFERENCE
                    },
                    ApiSecrets = new[]
                    {
                        new Secret(("&%****+$$$dijital_dershanem++++!!!____" +
                                    IdentityServerConst.API_RESOURCE_VCONFERENCE).Sha256())
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
            new ApiScope(IdentityServerConst.API_RESOURCE_ADMIN),
            new ApiScope(IdentityServerConst.API_RESOURCE_CONTENT),
            new ApiScope(IdentityServerConst.API_RESOURCE_CRM),
            new ApiScope(IdentityServerConst.API_RESOURCE_EVENT),
            new ApiScope(IdentityServerConst.API_RESOURCE_EXAM),
            new ApiScope(IdentityServerConst.API_RESOURCE_IDENTITY),
            new ApiScope(IdentityServerConst.API_RESOURCE_IYZICO),
            new ApiScope(IdentityServerConst.API_RESOURCE_MEMBER),
            new ApiScope(IdentityServerConst.API_RESOURCE_MESSAGING),
            new ApiScope(IdentityServerConst.API_RESOURCE_PAYMENT),
            new ApiScope(IdentityServerConst.API_RESOURCE_QUESTION),
            new ApiScope(IdentityServerConst.API_RESOURCE_REPORTING),
            new ApiScope(IdentityServerConst.API_RESOURCE_SHARED),
            new ApiScope(IdentityServerConst.API_RESOURCE_SURVEY),
            new ApiScope(IdentityServerConst.API_RESOURCE_TARGET),
            new ApiScope(IdentityServerConst.API_RESOURCE_VCONFERENCE) };

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
                    IdentityServerConst.API_RESOURCE_ADMIN,
                    IdentityServerConst.API_RESOURCE_CONTENT,
                    IdentityServerConst.API_RESOURCE_CRM,
                    IdentityServerConst.API_RESOURCE_EVENT,
                    IdentityServerConst.API_RESOURCE_EXAM ,
                    IdentityServerConst.API_RESOURCE_IDENTITY,
                    IdentityServerConst.API_RESOURCE_IYZICO,
                    IdentityServerConst.API_RESOURCE_MEMBER,
                    IdentityServerConst.API_RESOURCE_MESSAGING,
                    IdentityServerConst.API_RESOURCE_PAYMENT,
                    IdentityServerConst.API_RESOURCE_QUESTION,
                    IdentityServerConst.API_RESOURCE_REPORTING,
                    IdentityServerConst.API_RESOURCE_SHARED,
                    IdentityServerConst.API_RESOURCE_SURVEY,
                    IdentityServerConst.API_RESOURCE_TARGET,
                    IdentityServerConst.API_RESOURCE_VCONFERENCE
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
                    IdentityServerConst.API_RESOURCE_ADMIN,
                    IdentityServerConst.API_RESOURCE_CONTENT,
                    IdentityServerConst.API_RESOURCE_CRM,
                    IdentityServerConst.API_RESOURCE_EVENT,
                    IdentityServerConst.API_RESOURCE_EXAM ,
                    IdentityServerConst.API_RESOURCE_IDENTITY,
                    IdentityServerConst.API_RESOURCE_IYZICO,
                    IdentityServerConst.API_RESOURCE_MEMBER,
                    IdentityServerConst.API_RESOURCE_MESSAGING,
                    IdentityServerConst.API_RESOURCE_PAYMENT,
                    IdentityServerConst.API_RESOURCE_QUESTION,
                    IdentityServerConst.API_RESOURCE_REPORTING,
                    IdentityServerConst.API_RESOURCE_SHARED,
                    IdentityServerConst.API_RESOURCE_SURVEY,
                    IdentityServerConst.API_RESOURCE_TARGET,
                    IdentityServerConst.API_RESOURCE_VCONFERENCE
                    },
                AccessTokenLifetime =(int)(DateTime.Now.AddDays(60)-DateTime.Now).TotalSeconds,
                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                AbsoluteRefreshTokenLifetime = (int)(DateTime.Now.AddDays(90)-DateTime.Now).TotalSeconds,
                RequireClientSecret = false
            }};
    }
}