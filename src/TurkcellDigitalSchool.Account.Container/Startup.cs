using System.Globalization;
using System.IO;
using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServiceStack;
using TurkcellDigitalSchool.Account.Business;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Common.Middleware;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Container
{
    public partial class Startup : BusinessStartup
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="hostEnvironment"></param>
        public Startup(Microsoft.Extensions.Configuration.IConfiguration configuration, IHostEnvironment hostEnvironment)
            : base(configuration, hostEnvironment)
        {
        }


        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <remarks>
        /// It is common to all configurations and must be called. Aspnet core does not call this method because there are other methods.
        /// </remarks>
        /// <param name="services"></param>
        public override void ConfigureServices(IServiceCollection services)
        {
            // Business katmanında olan dependency tanımlarının bir metot üzerinden buraya implemente edilmesi.

            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });

            services.AddCors(options =>
            {
                options.AddPolicy(
                    "AllowOrigin",
                    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
             
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    var identityConf = Configuration.GetSection("IdentityServerConfig").Get<IdentityServerConfig>();
                    options.Authority = identityConf.BaseUrl;  // IdentityServerUrl gateway or direct
                    options.Audience = IdentityServerConst.API_RESOURCE_ACCOUNT;
                    options.RequireHttpsMetadata = false; 
                });

            //var tokenOptions = Configuration.GetSection("TokenOptions").Get<TokenOptions>();
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(options =>
            //    {
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuer = true,
            //            ValidateAudience = true,
            //            ValidateLifetime = true,
            //            ValidIssuer = tokenOptions.Issuer,
            //            ValidAudience = tokenOptions.Audience,
            //            ValidateIssuerSigningKey = true,
            //            IssuerSigningKey = SecurityKeyHelper.CreateSecurityKey(tokenOptions.SecurityKey),
            //            ClockSkew = TimeSpan.Zero
            //        };
            //    });

            services.AddSwaggerGen(c =>
            {
                c.IncludeXmlComments(Path.ChangeExtension(Assembly.GetEntryAssembly().Location, ".xml"));
            });

            services.AddTransient<FileLogger>();
            services.AddTransient<MsSqlLogger>();
            services.AddSingleton<RedisService>();

            base.ConfigureServices(services);
            services.AddApplicationInsightsTelemetry();
        }


        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, RedisService redisService)
        {
            // VERY IMPORTANT. Since we removed the build from AddDependencyResolvers, let's set the Service provider manually.
            // By the way, we can construct with DI by taking type to avoid calling static methods in aspects.
            ServiceTool.ServiceProvider = app.ApplicationServices;


            var configurationManager = app.ApplicationServices.GetService<Common.ConfigurationManager>();
            switch (configurationManager.Mode)
            {
                case ApplicationMode.LOCAL:
                    break;
                case ApplicationMode.DEV:
                    break;
                case ApplicationMode.DEVTURKCELL:
                    {
                        using (var scope = app.ApplicationServices.CreateScope())
                        {
                            var services = scope.ServiceProvider;
                            var context = services.GetRequiredService<AccountDbContext>();
                            context.Database.Migrate();
                        }
                        break;
                    }
                case ApplicationMode.STB:
                    //app.UseConsul(Configuration);
                    break;
                case ApplicationMode.PRP:
                    app.UseConsul(Configuration);
                    break;
                case ApplicationMode.PROD:
                    app.UseConsul(Configuration);
                    break;
            }

            app.UseDeveloperExceptionPage();

            app.ConfigureCustomExceptionMiddleware();
            app.UseMiddleware<SessionCheckMiddleware>();
            app.UseDbOperationClaimCreator().GetResult();

            app.UseSwagger();

            app.UseSwaggerUI(c => { c.SwaggerEndpoint("v1/swagger.json", "Kg Teknoloji"); });
            app.UseCors("AllowOrigin");

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            // Make Turkish your default language. It shouldn't change according to the server.
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("tr-TR"),
            });

            var cultureInfo = new CultureInfo("tr-TR");
            cultureInfo.DateTimeFormat.ShortTimePattern = "HH:mm";

            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

            app.UseStaticFiles();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
