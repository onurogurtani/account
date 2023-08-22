using System;
using System.Net;
using Autofac.Extensions.DependencyInjection;
using Consul;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using TurkcellDigitalSchool.Core.Enums;
using Winton.Extensions.Configuration.Consul;
using static ServiceStack.Diagnostics.Events;

namespace TurkcellDigitalSchool.Account.Api
{
    /// <summary>
    ///
    /// </summary>
    public static class Program
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            var builder = CreateHostBuilder(args);


            builder.ConfigureAppConfiguration((context, builder) =>
            { 
                if (context.HostingEnvironment.EnvironmentName != ApplicationMode.DEV.ToString())
                {
                    return;
                }
                 
                string consulHost = "http://localhost:8500/";
                try
                {
                    HttpWebRequest request = HttpWebRequest.Create(consulHost) as HttpWebRequest;

                    var response = (HttpWebResponse)request.GetResponse();

                    var statusCode = response.StatusCode;


                    string applicationName = context.HostingEnvironment.ApplicationName;
                    string environmentName = context.HostingEnvironment.EnvironmentName;
                    void ConsulConfig(ConsulClientConfiguration configuration)
                    {
                        configuration.Address = new Uri(consulHost);


                    }
                    builder.AddConsul($"{applicationName}/appsettings.{environmentName}.json",
                        source =>
                        {
                            source.Optional = true;
                            source.ConsulConfigurationOptions = ConsulConfig;
                        });
                }
                catch (Exception e )
                {
                    Log.Error(e, "Consul local ortamýnýzda bulunamadý !");
                }  
            }); 
            builder.Build().Run();
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseStartup<Startup>()
                        .ConfigureLogging(builder =>
                        {
                            builder.ClearProviders();
                        })
                        .UseSerilog((hostingContext, loggerConfiguration) =>
                        {
                            loggerConfiguration
                                .ReadFrom.Configuration(hostingContext.Configuration)
                                .Enrich.FromLogContext()
                                .Enrich.WithMachineName()
                                .Enrich.WithThreadId();
                        })
                        .ConfigureKestrel((context, options) =>
                        {

                            options.AddServerHeader = false;
                            options.Listen(IPAddress.Any, 6021, listenOptions =>
                            {
                            });
                        });
                });
    }
}
