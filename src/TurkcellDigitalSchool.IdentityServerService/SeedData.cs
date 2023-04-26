using Duende.IdentityServer.EntityFramework.DbContexts;
using Duende.IdentityServer.EntityFramework.Mappers; 
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace TurkcellDigitalSchool.IdentityServerService
{
    public class SeedData
    {
        public static void EnsureSeedData(WebApplication app)
        {
            using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                // Migration  aşağıdaki scriptler ile yapıldı
                //Add - Migration initialConfigurationDbContext - context ConfigurationDbContext
                //Update - Database - context ConfigurationDbContext
                //Add - Migration initialPersistedGrantDbContext - context PersistedGrantDbContext
                //Update - Database - context PersistedGrantDbContext

                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "DEVTURKCELL")
                {
                    scope.ServiceProvider.GetService<PersistedGrantDbContext>().Database.Migrate();
                }

                var context = scope.ServiceProvider.GetService<ConfigurationDbContext>();
                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "DEVTURKCELL")
                {
                    context.Database.Migrate();
                }
                EnsureSeedData(context);
            }
        }

        private static void EnsureSeedData(ConfigurationDbContext context)
        {
            if (!context.Clients.Any())
            {
                Log.Debug("Clients being populated");
                foreach (var client in Config.Clients.ToList())
                {
                    context.Clients.Add(client.ToEntity());
                }
                context.SaveChanges();
            }
            else
            {
                Log.Debug("Clients already populated");
            }


            if (!context.ApiResources.Any())
            {
                Log.Debug("ApiResource being populated");
                foreach (var resource in Config.ApiResources.ToList())
                {
                    context.ApiResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }
            else
            {
                Log.Debug("ApiResource already populated");
            }


            if (!context.IdentityResources.Any())
            {
                Log.Debug("IdentityResources being populated");
                foreach (var resource in Config.IdentityResources.ToList())
                {
                    context.IdentityResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }
            else
            {
                Log.Debug("IdentityResources already populated");
            }


            if (!context.ApiScopes.Any())
            {
                Log.Debug("ApiScopes being populated");
                foreach (var resource in Config.ApiScopes.ToList())
                {
                    context.ApiScopes.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }
            else
            {
                Log.Debug("ApiScopes already populated");
            }
        }
    }
}