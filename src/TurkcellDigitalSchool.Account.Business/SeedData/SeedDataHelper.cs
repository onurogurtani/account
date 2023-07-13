using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands;

namespace TurkcellDigitalSchool.Account.Business.SeedData
{
    public static class SeedDataHelper
    {
        public static async Task AppSettingDefaultData(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var services = scope.ServiceProvider;
            var mediatorServices = services.GetRequiredService<IMediator>();
            try
            {
                await mediatorServices.Send(new AppSettingsInitWithDefaultValueCommand());
            }
            catch (System.Exception e)
            {

                throw e;
            }
        }
    }
}
