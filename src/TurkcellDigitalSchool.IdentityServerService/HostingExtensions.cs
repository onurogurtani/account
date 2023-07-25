using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Serilog;
using System.Globalization;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Configure;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Redis;
using TurkcellDigitalSchool.Core.Redis.Contract;
using TurkcellDigitalSchool.Core.Services.SMS;
using TurkcellDigitalSchool.Core.Services.SMS.Turkcell;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.IdentityServerService.Pages.Admin.ApiScopes;
using TurkcellDigitalSchool.IdentityServerService.Pages.Admin.Clients;
using TurkcellDigitalSchool.IdentityServerService.Pages.Admin.IdentityScopes;
using TurkcellDigitalSchool.IdentityServerService.Services;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;

namespace TurkcellDigitalSchool.IdentityServerService
{
    internal static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {


            builder.Services.AddRazorPages();
            var connectionString = builder.Configuration.GetConnectionString("DArchPostgreContext");


            builder.Services.AddDbContext<AccountDbContext>();
            builder.Services.AddSingleton<Core.Common.ConfigurationManager>();
            builder.Services.AddScoped<ICustomUserSvc, CustomUserSvc>();
            builder.Services.AddScoped<IAppSettingRepository, AppSettingRepository>();

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserSessionRepository, UserSessionRepository>();
            builder.Services.AddScoped<ILoginFailCounterRepository, LoginFailCounterRepository>();
            builder.Services.AddScoped<IRoleRepository, RoleRepository>();
            builder.Services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            builder.Services.AddScoped<IRoleClaimRepository, RoleClaimRepository>();
            builder.Services.AddScoped<IUserPackageRepository, UserPackageRepository>();
            builder.Services.AddScoped<IMobileLoginRepository, MobileLoginRepository>();
            builder.Services.AddScoped<IOperationClaimRepository, OperationClaimRepository>();
            builder.Services.AddScoped<ITokenHelper, JwtHelper>();
            builder.Services.AddScoped<ILdapHelper, LdapHelper>();
            builder.Services.AddScoped<ISmsOtpRepository, SmsOtpRepository>();
            builder.Services.AddTransient<ICaptchaManager, CaptchaManager>();
            builder.Services.AddTransient<ILoginFailForgetPassSendLinkRepository, LoginFailForgetPassSendLinkRepository>();
            builder.Services.AddTransient<IMailService, MailManager>();
            builder.Services.AddScoped<ISendSms, SendSms>();


            builder.Services.Configure<RedisConfig>(builder.Configuration.GetSection("RedisConfig"));
            builder.Services.AddSingleton<IRedisConnectionFactory, RedisConnectionFactory>();
            builder.Services.AddSingleton<SessionRedisSvc>();
            builder.Services.AddSingleton<HandlerCacheRedisSvc>();



            var capConfig = builder.Configuration.GetSection("CapConfig").Get<CapConfig>();
            builder.Services.AddCap(options =>
            {
                options.UsePostgreSql(builder.Configuration.GetConnectionString("DArchPostgreContext"));
                options.UseRabbitMQ(rabbitMqOptions =>
                {
                    rabbitMqOptions.ConnectionFactoryOptions = connectionFactory =>
                    {
                        connectionFactory.Ssl.Enabled = capConfig.SslEnable; ;
                        connectionFactory.HostName = capConfig.HostName;
                        connectionFactory.UserName = capConfig.UserName;
                        connectionFactory.Password = capConfig.Password;
                        connectionFactory.Port = capConfig.Port;
                    };
                });
                options.UseDashboard(otp => { otp.PathMatch = "/MyCap"; });
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });


            builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            var isBuilder = builder.Services
                .AddIdentityServer(options =>
                {
                    options.Events.RaiseErrorEvents = true;
                    options.Events.RaiseInformationEvents = true;
                    options.Events.RaiseFailureEvents = true;
                    options.Events.RaiseSuccessEvents = true;
                    // see https://docs.duendesoftware.com/identityserver/v5/fundamentals/resources/
                    options.EmitStaticAudienceClaim = true;

                })
                .AddProfileService<CustomProfileService>()
                .AddResourceOwnerValidator<ResourceOwnerPasswordValidator>()
                .AddConfigurationStore(options =>
                {
                    options.DefaultSchema = "account";
                    options.ConfigureDbContext = b =>
                    {
                        b.UseNpgsql(connectionString,
                                    dbOpts =>
                                    {
                                        dbOpts.MigrationsAssembly(typeof(Program).Assembly.FullName);
                                    })
                                .UseLowerCaseNamingConvention();
                    };
                })
                // this is something you will want in production to reduce load on and requests to the DB
                //.AddConfigurationStoreCache()
                //
                // this adds the operational data from DB (codes, tokens, consents)
                .AddOperationalStore(options =>
                {
                    options.DefaultSchema = "account";
                    options.ConfigureDbContext = b =>
                        b.UseNpgsql(connectionString, dbOpts => dbOpts.MigrationsAssembly(typeof(Program).Assembly.FullName))
                            .UseLowerCaseNamingConvention();

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    options.RemoveConsumedTokens = true;
                });


            // this adds the necessary config for the simple admin/config pages
            {
                builder.Services.AddAuthorization(options =>
                    options.AddPolicy("admin",
                        policy => policy.RequireClaim("sub", "1"))
                );

                builder.Services.Configure<RazorPagesOptions>(options =>
                    options.Conventions.AuthorizeFolder("/Admin", "admin"));

                builder.Services.AddTransient<ClientRepository>();
                builder.Services.AddTransient<IdentityScopeRepository>();
                builder.Services.AddTransient<ApiScopeRepository>();
            }

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("tr-TR"),
            });

            var cultureInfo = new CultureInfo("tr-TR");
            cultureInfo.DateTimeFormat.ShortTimePattern = "HH:mm";

            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

            app.UseSerilogRequestLogging();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }



            app.UseStaticFiles();
            app.UseRouting();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.MapRazorPages().RequireAuthorization();
            return app;
        }
    }
}