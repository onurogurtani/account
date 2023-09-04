using MediatR;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserSearchHistories.Commands
{
    public class CreateUserSearchHistoryCommand : IRequest<IResult>
    {
        public string Text { get; set; }

        [MessageClassAttr("Kullanıcı Arama Geçmişi Ekleme")]
        public class CreateUserSearchHistoryCommandHandler : IRequestHandler<CreateUserSearchHistoryCommand, IResult>
        {
            private readonly IUserSearchHistoryRepository _userSearchHistoryRepository;
            private readonly ITokenHelper _tokenHelper;

            public CreateUserSearchHistoryCommandHandler(IUserSearchHistoryRepository userSearchHistoryRepository, ITokenHelper tokenHelper)
            {
                _userSearchHistoryRepository = userSearchHistoryRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(CreateUserSearchHistoryCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var newUserSearchHistory = new UserSearchHistory
                {
                    Text = request.Text,
                    UserId = userId,
                };
                var record = _userSearchHistoryRepository.Add(newUserSearchHistory);
                await _userSearchHistoryRepository.SaveChangesAsync();

                return new SuccessDataResult<UserSearchHistory>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
