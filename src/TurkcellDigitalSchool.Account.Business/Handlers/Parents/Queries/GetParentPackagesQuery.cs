using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [LogScope]
    public class GetParentPackagesQuery : IRequest<DataResult<List<ParentPackegesDto>>>
    {
        public class GetParentPackagesQueryHandler : IRequestHandler<GetParentPackagesQuery, DataResult<List<ParentPackegesDto>>>
        {
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;

            public GetParentPackagesQueryHandler(IUserService userService, ITokenHelper tokenHelper)
            {
                _userService = userService;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<List<ParentPackegesDto>>> Handle(GetParentPackagesQuery request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                if (userId == 0)
                {
                    return new ErrorDataResult<List<ParentPackegesDto>>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<List<ParentPackegesDto>>(_userService.GetParentPackagesByParentId(userId));
            }

        }
    }
}
