using MediatR;
using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;  

namespace TurkcellDigitalSchool.Account.Business.Jobs
{
    public class BackgroundWorker<T> : BackgroundService where T : class, new()
    {
        private readonly IMediator _mediator;
        private readonly ILogger<BackgroundWorker<T>> _logger;
        private T _command;

        public BackgroundWorker(IMediator mediator, ILogger<BackgroundWorker<T>> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        public Task Send(T command, CancellationToken stoppingToken)
        {
            _command = command;
            return StartAsync(stoppingToken);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Jobs handler taskına send ediliyor.");
            try
            {
                _mediator.Send(_command, stoppingToken);
            }
            catch (System.Exception e)
            {
                _logger.LogError("Jobs handler taskına send ediliyor. " + e);
                throw;
            }
            _logger.LogInformation("Jobs handler taskına send edildi.");
            return Task.CompletedTask;
        }
    }
}
