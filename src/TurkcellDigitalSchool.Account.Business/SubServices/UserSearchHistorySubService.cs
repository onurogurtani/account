using DotNetCore.CAP;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.UserSearchHistories.Commands;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class UserSearchHistorySubService : BaseSubServices<AccountSubscribeDbContext>
    {
        private readonly IMediator _mediator;
        public UserSearchHistorySubService(AccountSubscribeDbContext context, IMediator mediator) : base(context)
        {
            _mediator = mediator;
        }

        [CapSubscribe("userSearchHistoryCreateRequest")]
        public async Task Created(string text)
        {
            await _mediator.Send(new CreateUserSearchHistoryCommand { Text = text }, new CancellationToken());
        }
    }
}
