using System;
using System.Net;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

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
            CreateHostBuilder(args).Build().Run();
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
