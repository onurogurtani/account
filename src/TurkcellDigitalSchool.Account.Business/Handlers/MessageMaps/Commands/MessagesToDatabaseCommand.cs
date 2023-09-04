using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.ServiceMessages.Queries;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.EducationServices;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.EventServices;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.ExamServices;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.ReportingServices;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Core.SubServiceConst;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    public class MessagesToDatabaseCommand : IRequest<IResult>
    {
        public class MessagesToDatabaseCommandHandler : IRequestHandler<MessagesToDatabaseCommand, IResult>
        {
            private readonly IMediator _mediator;
            private readonly ICapPublisher _capPublisher;
            private readonly IEducationServices _educationServices;
            private readonly IEventServices _eventServices;
            private readonly IExamServices _examServices;
            private readonly IFileServices _fileServices;
            private readonly IReportingServices _reportingServices;

            public MessagesToDatabaseCommandHandler(IMediator mediator, ICapPublisher capPublisher, IEducationServices educationServices, IEventServices eventServices, IExamServices examServices, IFileServices fileServices, IReportingServices reportingServices)
            {
                _mediator = mediator;
                _capPublisher = capPublisher;
                _educationServices = educationServices;
                _eventServices = eventServices;
                _examServices = examServices;
                _fileServices = fileServices;
                _reportingServices = reportingServices;
            }

            public async Task<IResult> Handle(MessagesToDatabaseCommand request, CancellationToken cancellationToken)
            {
                List<ConstantMessageDtos> items = new();

                var accountGetAllMessage = await _mediator.Send(new GetAppMessagesQuery(), cancellationToken);
                if (accountGetAllMessage.Success == true )
                    items.AddRange(accountGetAllMessage.Data);

                if (_educationServices != null )
                {
                    var messages =  await _educationServices.GetAppMessagesQuery();
                    if (messages.Success == true && messages.Data.Any())
                        items.AddRange(messages.Data);
                }

                if (_eventServices != null)
                {
                    var messages = await _eventServices.GetAppMessagesQuery();
                    if (messages.Success == true && messages.Data.Any())
                        items.AddRange(messages.Data);
                }

                if (_examServices != null)
                {
                    var messages = await _examServices.GetAppMessagesQuery();
                    if (messages.Success == true && messages.Data.Any())
                        items.AddRange(messages.Data);
                }

                if (_fileServices != null)
                {
                    var messages = await _fileServices.GetAppMessagesQuery();
                    if (messages.Success == true && messages.Data.Any())
                        items.AddRange(messages.Data);
                }

                if (_reportingServices != null)
                {
                    var messages = await _reportingServices.GetAppMessagesQuery();
                    if (messages.Success == true && messages.Data.Any())
                        items.AddRange(messages.Data);
                }

                await _capPublisher.PublishAsync(SubServiceConst.MESSAGE_MAP_CREATE_REQUEST, items);

                return new SuccessResult(Messages.SuccessfulOperation);
            }

        }
    }
}
