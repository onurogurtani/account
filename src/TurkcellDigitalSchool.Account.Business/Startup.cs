using System;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using Autofac;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting; 
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.LdapLoginService;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.TurkcellFastLoginService;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Business.SubServices.RegisterServices;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Common.DependencyResolvers;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors;
using TurkcellDigitalSchool.Core.Configure;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Microsoft;
using TurkcellDigitalSchool.Core.DependencyResolvers;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Redis;
using TurkcellDigitalSchool.Core.Redis.Contract;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService;
using TurkcellDigitalSchool.Core.Services.KpsService;
using TurkcellDigitalSchool.Core.Utilities.ElasticSearch;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.MessageBrokers.RabbitMq;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Integration.Helper;
using TurkcellDigitalSchool.Integration.Type; 

namespace TurkcellDigitalSchool.Account.Business
{
    public partial class BusinessStartup
    {
        public BusinessStartup(IConfiguration configuration, IHostEnvironment hostEnvironment)
        {
            Configuration = configuration;
            HostEnvironment = hostEnvironment;
        }

        public IConfiguration Configuration { get; }

        protected IHostEnvironment HostEnvironment { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <remarks>
        /// It is common to all configurations and must be called. Aspnet core does not call this method because there are other methods.
        /// </remarks>
        /// <param name="services"></param>
        public virtual void ConfigureServices(IServiceCollection services)
        {
            Func<IServiceProvider, ClaimsPrincipal> getPrincipal = (sp) =>
                sp.GetService<IHttpContextAccessor>().HttpContext?.User ??
                new ClaimsPrincipal(new ClaimsIdentity(Messages.Unknown));

            services.AddScoped<IPrincipal>(getPrincipal);
            services.AddMemoryCache();

            var coreModule = new CoreModule();

            services.AddDependencyResolvers(Configuration, new ICoreModule[] { coreModule });
            services.AddSingleton<Common.ConfigurationManager>();
            services.AddTransient<ITokenHelper, JwtHelper>();
            services.AddTransient<IElasticSearch, ElasticSearchManager>();
            services.AddTransient<ICaptchaManager, CaptchaManager>();
            services.AddTransient<IMessageBrokerHelper, MqQueueHelper>();
            services.AddTransient<IMessageConsumer, MqConsumerHelper>();
            services.AddSingleton<ICacheManager, MemoryCacheManager>();
            services.AddScoped<IPathHelper, PathHelper>();
            services.AddScoped<ILdapLoginService, LdapLoginService>();
            services.AddScoped<ITurkcellFastLoginService, TurkcellFastLoginService>();
            services.AddScoped<IKpsService, KpsService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IOtpService, OtpService>();
            services.AddAutoMapper( Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddMediatR(typeof(BusinessStartup).GetTypeInfo().Assembly);


            services.Configure<RedisConfig>(Configuration.GetSection("RedisConfig")); 
            services.AddSingleton<IRedisConnectionFactory, RedisConnectionFactory>(); 
            services.AddSingleton<SessionRedisSvc>();

            services.AddTransient<ICustomMessgeHelperService, CustomMessgeHelperService>();
            services.AddSubServices();
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Education);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Event);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Exam);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.File);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Reporting);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.IdentityServer);

            //ValidatorOptions.Global.DisplayNameResolver = (type, memberInfo, expression) =>
            //{
            //    if (memberInfo != null)
            //    {
            //        return memberInfo.GetCustomAttribute<System.ComponentModel.DataAnnotations.DisplayAttribute>()
            //       ?.GetName();
            //    }
            //    return null;
            //};
            var capConfig = Configuration.GetSection("CapConfig").Get<CapConfig>();
            services.AddCap(options =>
            { 
                options.UsePostgreSql(Configuration.GetConnectionString("DArchPostgreContext"));
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
            });
        }


        /// <summary>
        /// This method gets called by the Local
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureLocalServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }

        /// <summary>
        /// This method gets called by the Dev
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureDEVServices(IServiceCollection services)
        {
            ConfigureServices(services);

            services.AddDbContext<AccountDbContext>();
            services.AddDbContext<AccountSubscribeDbContext>();
            services.AddConsulConfig(Configuration);
        }



        /// <summary>
        /// This method gets called by the Dev
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureDEVTURKCELLServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }


        /// <summary>
        /// This method gets called by the Qa
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureQaServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }

        /// <summary>
        /// This method gets called by the Prod
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureProdServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }

        /// <summary>
        /// This method gets called by the Development
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            ConfigureServices(services);
        }

        /// <summary>
        /// This method gets called by the Testing
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureTestingServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }

        /// <summary>
        /// This method gets called by the Docker
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureDockerServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }

        /// <summary>
        /// This method gets called by the Staging
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureStagingServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }

        /// <summary>
        /// This method gets called by the Production
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureProductionServices(IServiceCollection services)
        {
            ConfigureServices(services);

            services.AddDbContext<AccountDbContext>();
            services.AddDbContext<AccountSubscribeDbContext>(); 
        }


        /// <summary>
        ///
        /// </summary>
        /// <param name="builder"></param>
        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new AutofacBusinessModule(new TurkcellDigitalSchool.Common.ConfigurationManager(Configuration, HostEnvironment)));
        }
    }
}
