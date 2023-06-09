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
                            var address = context.Configuration.GetValue<string>("Consul:AppUrl");

                            var uri = new Uri(address);
                            var port = uri.Port;
                            var ip = uri.Host;
                            options.AddServerHeader = false;
                            options.Listen(IPAddress.Any, uri.Port, listenOptions =>
                            {
                                // Enables HTTP/3
                                //listenOptions.Protocols = HttpProtocols.Http3;
                            });
                        });
                });
    }
}
