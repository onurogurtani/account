using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;

namespace TurkcellDigitalSchool.Account.Business.Jobs
{
    public class HangfireJobSender
    {
        private readonly IMediator _mediator;
        private readonly ILogger<HangfireJobSender> _logger;
        public HangfireJobSender(IMediator mediator, ILogger<HangfireJobSender> logger)
        {
            _logger = logger;
            _mediator = mediator;
        }

        public void Send<T>(T command)
        {
            _logger.LogInformation("Jobs handler taskına send ediliyor.");
            try
            {
                var result = _mediator.Send(command).Result;
            }
            catch (System.Exception e)
            {
                _logger.LogError("Jobs handler taskına send ediliyor. " + e);
                throw;
            }
            _logger.LogInformation("Jobs handler taskına send edildi.");
        }

        public Task Send<T>(T command, CancellationToken cancellationToken = default!)
        {
            _logger.LogInformation("Jobs handler taskına send ediliyor.");
            try
            {
                var result = _mediator.Send(command, cancellationToken);
                return result;
            }
            catch (System.Exception e)
            {
                _logger.LogError("Jobs handler taskına send ediliyor. " + e);
                throw;
            }
            _logger.LogInformation("Jobs handler taskına send edildi.");
        }
    }
}
