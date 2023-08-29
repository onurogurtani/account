using System.Globalization;
using System.IO;
using System.Reflection;
using System.Text.Json.Serialization;
using Hangfire;
using MediatR;
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
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.Business.Jobs;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.Common.Middleware;
using TurkcellDigitalSchool.Core.ApiDoc;
using TurkcellDigitalSchool.Core.Constants.IdentityServer; 
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Exam.Business.Handlers.TestExams.Commands; 
using TurkcellDigitalSchool.Account.Business.SeedData;
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;

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


            services.AddSwaggerGen(c =>
            {
                c.IncludeXmlComments(Path.ChangeExtension(Assembly.GetEntryAssembly().Location, ".xml"));
            }); 

            base.ConfigureServices(services);
            services.AddApplicationInsightsTelemetry();
        }


        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // VERY IMPORTANT. Since we removed the build from AddDependencyResolvers, let's set the Service provider manually.
            // By the way, we can construct with DI by taking type to avoid calling static methods in aspects.
            ServiceTool.ServiceProvider = app.ApplicationServices;

            
     


            var configurationManager = app.ApplicationServices.GetService<Core.Common.ConfigurationManager>();
            switch (configurationManager.Mode)
            {

                case ApplicationMode.DEV:
                    using (var scope = app.ApplicationServices.CreateScope())
                    {
                        var services = scope.ServiceProvider;
                        var context = services.GetRequiredService<AccountDbContext>();
                        context.Database.Migrate();
                    }
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
                case ApplicationMode.STBTURKCELL:
                    {
                        using (var scope = app.ApplicationServices.CreateScope())
                        {
                            var services = scope.ServiceProvider;
                            var context = services.GetRequiredService<AccountDbContext>();
                            context.Database.Migrate();
                        }
                        break;
                    }
                case ApplicationMode.PRPTURKCELL:
                {
                    using (var scope = app.ApplicationServices.CreateScope())
                    {
                        var services = scope.ServiceProvider;
                        var context = services.GetRequiredService<AccountDbContext>();
                        context.Database.Migrate();
                    }
                    break;
                }
                case ApplicationMode.ALPHATURKCELL:
                    {
                        using (var scope = app.ApplicationServices.CreateScope())
                        {
                            var services = scope.ServiceProvider;
                            var context = services.GetRequiredService<AccountDbContext>();
                            context.Database.Migrate();
                        }
                        break;
                    }
            }

            SeedDataHelper.AppSettingDefaultData(app).GetResult();

            app.UseDeveloperExceptionPage();

            app.ConfigureCustomExceptionMiddleware();
            app.UseMiddleware<SessionCheckMiddleware>();
            app.UseDbOperationClaimCreator().GetResult();

            //TODO kod kapatıldı Yusuf. 
            //if (!configurationManager.Mode.ToString().EnvIsSTB())
            //{
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("v1/swagger.json", "Kg Teknoloji"); });
            //}


            app.UseCors("AllowOrigin");
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[] { new HangifreAuthorizationFilter() }
            });
            RunHangFireJobs();
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



        public static void RunHangFireJobs()
        {
            RecurringJob.AddOrUpdate<HangfireJobSender>("Get_Ldap_Learnup_Users_Routine",
            job => job.Send(new LdapUserInfoCommand()), Cron.Daily());

            RecurringJob.AddOrUpdate<HangfireJobSender>(" LongTimeNotLogin_Notification_Routine",
                job => job.Send(new LongTimeNotLoginNotificationCommand()), Cron.DayInterval(10));

            RecurringJob.AddOrUpdate<HangfireJobSender>("BirthDayn_Notification_Routine",
            job => job.Send(new BirthDayNotificationCommand()), Cron.DayInterval(1));

            RecurringJob.AddOrUpdate<HangfireJobSender>("SetPassive_ExpiredDocument_Routine",
            job => job.Send(new SetPassiveExpiredDocumentCommand()), Cron.Hourly());

        }
    }
}
