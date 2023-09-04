using DotNetCore.CAP;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService.Model;
using TurkcellDigitalSchool.Core.SubServiceConst;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class CreateMessageMapRequestServices : BaseSubServices<AccountSubscribeDbContext>
    {
        private readonly IMediator _mediator;

        public CreateMessageMapRequestServices(AccountSubscribeDbContext context, IMediator mediator) : base(context)
        {
            _mediator = mediator;
        }

        [CapSubscribe(SubServiceConst.MESSAGE_MAP_CREATE_REQUEST)]
        public async Task CreateOperationClaim(List<ConstantMessageDtos> items)
        {
            await _mediator.Send(new CreateMessageMapCommand { ConstantMessageDtos = items }, new CancellationToken());
        } 
    }
}
