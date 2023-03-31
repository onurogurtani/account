using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class GetUserNameSuggestQuery : IRequest<IDataResult<List<SelectionItem>>>
    {
        public string UserName { get; set; }
        public class GetUserNameSuggestQueryHandler : IRequestHandler<GetUserNameSuggestQuery, IDataResult<List<SelectionItem>>>
        {
            private readonly IUserRepository _userRepository;

            public GetUserNameSuggestQueryHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            /// <summary>
            /// Username Suggestion
            /// If a similar nickname is chosen while creating a nickname, different nickname suggestions are offered by the system.
            /// </summary>
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<List<SelectionItem>>> Handle(GetUserNameSuggestQuery request, CancellationToken cancellationToken)
            {
                var isThereRecord = await _userRepository.GetAsync(w => w.UserName == request.UserName && w.RegisterStatus == RegisterStatus.Registered);
                if (isThereRecord != null)
                {
                    List<SelectionItem> userNames = new();
                    do
                    {
                        userNames = new();
                        var random = new Random();                        
                        while (userNames.Count < 3)
                        {
                            userNames.Add(new SelectionItem
                            {
                                Id = userNames.Count,
                                Label= request.UserName + random.Next(1, 100)
                            });
                        }
                    } while (_userRepository.Query().Any(w=> userNames.Select(x=>x.Label).Contains(w.UserName) && w.RegisterStatus == RegisterStatus.Registered));
                    return new ErrorDataResult<List<SelectionItem>>(userNames);
                }

                return new SuccessDataResult<List<SelectionItem>>(Messages.Added);
            }
        }
    }
}
