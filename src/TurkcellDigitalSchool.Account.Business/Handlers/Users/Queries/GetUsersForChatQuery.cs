using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [LogScope]
    public class GetUsersForChatQuery : IRequest<DataResult<IEnumerable<UserChatDto>>>
    {
        public class GetUsersForChatQueryHandler : IRequestHandler<GetUsersForChatQuery, DataResult<IEnumerable<UserChatDto>>>
        {
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly IStudentCoachRepository _studentCoachRepository;
            private readonly ICoachLeaderCoachRepository _coachLeaderCoachRepository;
            private readonly IUserService _userService;

            public GetUsersForChatQueryHandler(IUserRepository userRepository, IStudentCoachRepository studentCoachRepository, ICoachLeaderCoachRepository coachLeaderCoachRepository, ITokenHelper tokenHelper, IUserService userService)
            {
                _userRepository = userRepository;
                _studentCoachRepository = studentCoachRepository;
                _coachLeaderCoachRepository = coachLeaderCoachRepository;
                _tokenHelper = tokenHelper;
                _userService = userService;
            }

            public async Task<DataResult<IEnumerable<UserChatDto>>> Handle(GetUsersForChatQuery request, CancellationToken cancellationToken)
            {
                var currentUserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentUserId);

                List<UserChatDto> userChats = new();

                if (currentUser.UserType == UserType.Student)
                {
                    var coachList = _studentCoachRepository.Query()
                                        .Where(x => x.UserId == currentUserId)
                                        .Join(_userRepository.Query(),
                                              studentCoach => studentCoach.CoachId,
                                              user => user.Id,
                                              (studentCoach, user) => new UserChatDto
                                              {
                                                  Id = user.Id,
                                                  Name = user.Name,
                                                  SurName = user.SurName,
                                                  AvatarId = user.AvatarId,
                                                  UserType = user.UserType
                                              })
                                        .ToList();
                    userChats.AddRange(coachList);
                }

                if (currentUser.UserType == UserType.Parent)
                {
                    var coachLeaderList = _userService.GetStudentsOfParentByParentId(currentUserId)
                                            .Join(_studentCoachRepository.Query(), student => student.Id, sc => sc.UserId,
                                                  (student, studentCoach) => studentCoach.CoachId)
                                            .Join(_coachLeaderCoachRepository.Query(), coachId => coachId, clc => clc.CoachId,
                                                  (coachId, coachLeader) => coachLeader.Id)
                                            .Join(_userRepository.Query(), coachLeaderId => coachLeaderId, user => user.Id,
                                                  (coachLeaderId, user) => new UserChatDto
                                                  {
                                                      Id = user.Id,
                                                      Name = user.Name,
                                                      SurName = user.SurName,
                                                      AvatarId = user.AvatarId,
                                                      UserType = user.UserType
                                                  })
                                            .ToList();
                    userChats.AddRange(coachLeaderList);
                }

                if (currentUser.UserType == UserType.Coach)
                {
                    var studentList = _studentCoachRepository.Query()
                        .Where(w => w.CoachId == currentUserId)
                        .Join(_userRepository.Query(), studentCoach => studentCoach.UserId, user => user.Id,
                              (studentCoach, user) => new UserChatDto
                              {
                                  Id = user.Id,
                                  Name = user.Name,
                                  SurName = user.SurName,
                                  AvatarId = user.AvatarId,
                                  UserType = user.UserType
                              })
                        .ToList();

                    var coachLeaderList = _coachLeaderCoachRepository.Query()
                        .Where(w => w.CoachId == currentUserId)
                        .Join(_userRepository.Query(), clc => clc.UserId, user => user.Id,
                              (clc, user) => new UserChatDto
                              {
                                  Id = user.Id,
                                  Name = user.Name,
                                  SurName = user.SurName,
                                  AvatarId = user.AvatarId,
                                  UserType = user.UserType
                              })
                        .ToList();

                    userChats.AddRange(studentList);
                    userChats.AddRange(coachLeaderList);
                }

                if (currentUser.UserType == UserType.CoachLeader)
                {
                    var coachList = _coachLeaderCoachRepository.Query()
                                        .Where(w => w.UserId == currentUserId)
                                        .Join(_userRepository.Query(), clc => clc.CoachId, user => user.Id,
                                              (clc, user) => new UserChatDto
                                              {
                                                  Id = user.Id,
                                                  Name = user.Name,
                                                  SurName = user.SurName,
                                                  AvatarId = user.AvatarId,
                                                  UserType = user.UserType
                                              })
                                        .ToList();
                    userChats.AddRange(coachList);

                    var parentList = _studentCoachRepository.Query()
                                        .Where(w => coachList.Select(s=>s.Id).Contains(w.CoachId))
                                        .SelectMany(s => _userService.GetByStudentParentsInformation(s.UserId)
                                                              .Select(p => new UserChatDto
                                                              {
                                                                  Id = p.Id,
                                                                  Name = p.Name,
                                                                  SurName = p.SurName,
                                                                  AvatarId = _userRepository.Query().FirstOrDefault(w => w.Id == p.Id).AvatarId,
                                                                  UserType = UserType.Parent
                                                              }))
                                        .Distinct()
                                        .ToList();
                    userChats.AddRange(parentList);
                }

                return new SuccessDataResult<IEnumerable<UserChatDto>>(userChats);
            }
        }
    }
}