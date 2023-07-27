using Duende.IdentityServer.EntityFramework.DbContexts;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace TurkcellDigitalSchool.IdentityServerService.Context
{
    public class CustomPersistedGrantDbContext : PersistedGrantDbContext
    {
        protected readonly IConfiguration _configuration;
        public CustomPersistedGrantDbContext(DbContextOptions<PersistedGrantDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("account");
            var asssebly = Assembly.GetExecutingAssembly();

            modelBuilder.ApplyConfigurationsFromAssembly(asssebly);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string machineName = Environment.MachineName;
                base.OnConfiguring(optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DArchPostgreContext")));
            }
            optionsBuilder.UseLowerCaseNamingConvention();
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DArchPostgreContext"), x => x.MigrationsHistoryTable("__EFMigrationsHistory", "account"));

        }
    }
}