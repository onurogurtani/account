using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace TurkcellDigitalSchool.Account.Api
{
    /// <summary>
    ///
    /// </summary>
    public partial class Startup : Container.Startup
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="hostEnvironment"></param>
        public Startup(IConfiguration configuration, IHostEnvironment hostEnvironment)
            : base(configuration, hostEnvironment)
        {
        }

    }
}