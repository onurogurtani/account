using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using System.Linq;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Common.Constants;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserSearchHistories.Queries
{
    public class GetUserSearchHistoryQuery : IRequest<DataResult<List<UserSearchHistory>>>
    {
        public string? SearchWord { get; set; }
        public class GetUserSearchHistoryQueryHandler : IRequestHandler<GetUserSearchHistoryQuery, DataResult<List<UserSearchHistory>>>
        {
            private readonly IUserSearchHistoryRepository _userSearchHistoryRepository;
            private readonly ITokenHelper _tokenHelper;

            public GetUserSearchHistoryQueryHandler(IUserSearchHistoryRepository userSearchHistoryRepository, ITokenHelper tokenHelper)
            {
                _userSearchHistoryRepository = userSearchHistoryRepository;
                _tokenHelper = tokenHelper;
            }

            public async Task<DataResult<List<UserSearchHistory>>> Handle(GetUserSearchHistoryQuery request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();

                var userSearchHistoryQuery = _userSearchHistoryRepository
                    .Query().AsQueryable()
                    .Where(x => x.UserId == userId);

                if (!string.IsNullOrEmpty(request.SearchWord))
                    userSearchHistoryQuery = userSearchHistoryQuery.Where(x => x.Text.StartsWith(request.SearchWord));

                var userSearchHistoryList = userSearchHistoryQuery
                    .Select(x => new UserSearchHistory
                    {
                        Id = x.Id,
                        Text = x.Text,
                        UserId = userId
                    }).OrderByDescending(x => x.InsertTime).TakeLast(10).ToList();

                return new SuccessDataResult<List<UserSearchHistory>>(userSearchHistoryList, Messages.SuccessfulOperation);
            }
        }
    }
}
