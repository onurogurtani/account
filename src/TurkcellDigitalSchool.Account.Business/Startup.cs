using System;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.Json.Serialization;
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
using TurkcellDigitalSchool.Account.Business.Services.TransactionManager;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Business.SubServices.RegisterServices;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.AuthorityManagement.Services;
using TurkcellDigitalSchool.Core.AuthorityManagement.Services.Abstract;
using TurkcellDigitalSchool.Core.Behaviors;
using TurkcellDigitalSchool.Core.Common.DependencyResolvers;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Configure;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Microsoft;
using TurkcellDigitalSchool.Core.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.DependencyResolvers;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Integration.Helper;
using TurkcellDigitalSchool.Core.Integration.Type;
using TurkcellDigitalSchool.Core.Redis;
using TurkcellDigitalSchool.Core.Redis.Contract;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService;
using TurkcellDigitalSchool.Core.Services.EntityChangeServices;
using TurkcellDigitalSchool.Core.Services.EuroMessageService;
using TurkcellDigitalSchool.Core.Services.KpsService;
using TurkcellDigitalSchool.Core.Services.SMS;
using TurkcellDigitalSchool.Core.Services.SMS.Turkcell;
using TurkcellDigitalSchool.Core.TransactionManager;
using TurkcellDigitalSchool.Core.Utilities.ElasticSearch;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.MessageBrokers.RabbitMq;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

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
            services.AddSingleton<Core.Common.ConfigurationManager>();
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

            services.AddScoped<IEntityChangeServices, EntityChangeServices>();
            services.AddScoped<ITransactionManager, AccountDbTransactionManagerSvc>();

            services.AddScoped<IClaimDefinitionService, ClaimDefinitionService>();
            services.AddScoped<ISendSms,SendSms>();
            services.AddTransient<IEuroMessageServices, EuroMessageServices>();
            services.AddAutoMapper( Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(PerformanceBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LogBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(CacheBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(PublishBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(TransactionBehavior<,>));

            services.AddMediatR(typeof(BusinessStartup).GetTypeInfo().Assembly);


            services.Configure<RedisConfig>(Configuration.GetSection("RedisConfig"));
            services.AddSingleton<IRedisConnectionFactory, RedisConnectionFactory>();
            services.AddSingleton<SessionRedisSvc>();
            services.AddSingleton<HandlerCacheRedisSvc>();

            services.AddTransient<ICustomMessgeHelperService, CustomMessgeHelperService>();
            services.AddSubServices();
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Education);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Event);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Exam);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.File);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.Reporting);
            services.AddMsIntegrationServicesWithName(Configuration, MsType.IdentityServer);


            
            var capConfig = Configuration.GetSection("CapConfig").Get<CapConfig>();
            services.AddCap(options =>
            {
                options.UsePostgreSql(sqlOptions =>
                {
                    sqlOptions.ConnectionString = Configuration.GetConnectionString("DArchPostgreContext");
                    sqlOptions.Schema = "account";
                });
                options.UseRabbitMQ(rabbitMqOptions =>
                {
                    rabbitMqOptions.ConnectionFactoryOptions = connectionFactory =>
                    {
                        connectionFactory.Ssl.Enabled = capConfig.SslEnable;
                        connectionFactory.HostName = capConfig.HostName;
                        connectionFactory.UserName = capConfig.UserName;
                        connectionFactory.Password = capConfig.Password;
                        connectionFactory.Port = capConfig.Port;
                    };
                });
                options.UseDashboard(otp => { otp.PathMatch = "/MyCap"; });
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
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



        //TODO Neden t�m ortamlar i�in conf servise var.

        /// <summary>
        /// This method gets called by the Dev
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureSTBServices(IServiceCollection services)
        {
            ConfigureServices(services);

            services.AddDbContext<IProjectContext,AccountDbContext>();
            services.AddDbContext<AccountSubscribeDbContext>();
        }

        /// <summary>
        /// This method gets called by the Dev
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureDEVServices(IServiceCollection services)
        {
            ConfigureServices(services);

            services.AddDbContext<IProjectContext,AccountDbContext>();
            services.AddDbContext<AccountSubscribeDbContext>(); 
        }


        /// <summary>
        /// This method gets called by the Dev
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureSTBTURKCELLServices(IServiceCollection services)
        {
            ConfigureSTBServices(services);
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
        /// This method gets called by the TURKCELL Environment
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureALPHATURKCELLServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }

        public void ConfigureSTAGINGServices(IServiceCollection services)
        {
            ConfigureDEVServices(services);
        }
          
        /// <summary>
        ///
        /// </summary>
        /// <param name="builder"></param>
        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new AutofacBusinessModule(new TurkcellDigitalSchool.Core.Common.ConfigurationManager(Configuration, HostEnvironment)));
        }
    }
}
