using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
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
            private readonly IStudentParentInformationRepository _studentParentInformationRepository;
            private readonly ICoachLeaderCoachRepository _coachLeaderCoachRepository;
            private readonly IUserService _userService;
            private readonly IFileRepository _fileRepository;

            public GetUsersForChatQueryHandler(IUserRepository userRepository, IStudentCoachRepository studentCoachRepository, IStudentParentInformationRepository studentParentInformationRepository, ICoachLeaderCoachRepository coachLeaderCoachRepository, ITokenHelper tokenHelper, IUserService userService, IFileRepository fileRepository)
            {
                _userRepository = userRepository;
                _studentCoachRepository = studentCoachRepository;
                _studentParentInformationRepository = studentParentInformationRepository;
                _coachLeaderCoachRepository = coachLeaderCoachRepository;
                _tokenHelper = tokenHelper;
                _userService = userService;
                _fileRepository = fileRepository;
            }

            public async Task<DataResult<IEnumerable<UserChatDto>>> Handle(GetUsersForChatQuery request, CancellationToken cancellationToken)
            {
                var currentUserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentUserId);

                List<UserChatDto> userChats = new();

                if (currentUser.UserType == UserType.Student)
                {
                    var result = (from studentCoach in _studentCoachRepository.Query()
                                  join user in _userRepository.Query() on studentCoach.CoachId equals user.Id
                                  where studentCoach.UserId == currentUserId
                                  select user) // Coach List
                                .Union(from studentCoach in _studentCoachRepository.Query()
                                       join coachLeader in _coachLeaderCoachRepository.Query() on studentCoach.CoachId equals coachLeader.CoachId
                                       join user in _userRepository.Query() on coachLeader.UserId equals user.Id
                                       where studentCoach.UserId == currentUserId
                                       select user) // Coach Leader List
                                .Distinct()
                               .Select(user => new UserChatDto
                               {
                                   Id = user.Id,
                                   Name = user.Name,
                                   SurName = user.SurName,
                                   AvatarPath = user.AvatarId > 0 ? _fileRepository.Query().FirstOrDefault(g => g.Id == user.AvatarId).FilePath : "",
                                   UserType = user.UserType
                               }).ToList();
                    userChats.AddRange(result);
                }

                if (currentUser.UserType == UserType.Parent)
                {
                    var studentList = _userService.GetStudentsOfParentByParentId(currentUserId);
                    var result = (from students in studentList
                                  join coach in _studentCoachRepository.Query() on students.Id equals coach.UserId
                                  join user in _userRepository.Query() on coach.CoachId equals user.Id
                                  select user) // Coach List
                                .Union(from students in studentList
                                       join coach in _studentCoachRepository.Query() on students.Id equals coach.UserId
                                       join coachLeader in _coachLeaderCoachRepository.Query() on coach.CoachId equals coachLeader.CoachId
                                       join user in _userRepository.Query() on coachLeader.UserId equals user.Id
                                       select user) // Coach Leader List
                                .Distinct()
                                .Select(user => new UserChatDto
                                {
                                    Id = user.Id,
                                    Name = user.Name,
                                    SurName = user.SurName,
                                    AvatarPath = user.AvatarId > 0 ? _fileRepository.Query().FirstOrDefault(g => g.Id == user.AvatarId).FilePath : "",
                                    UserType = user.UserType
                                })
                                .ToList();
                    userChats.AddRange(result);
                }

                if (currentUser.UserType == UserType.Coach)
                {
                    var result = (from studentCoach in _studentCoachRepository.Query()
                                  join user in _userRepository.Query() on studentCoach.UserId equals user.Id
                                  where studentCoach.CoachId == currentUserId
                                  select user) // Student List
                                .Union(from studentCoach in _studentCoachRepository.Query()
                                       join studentParent in _studentParentInformationRepository.Query() on studentCoach.UserId equals studentParent.UserId
                                       join user in _userRepository.Query() on studentParent.ParentId equals user.Id
                                       where studentCoach.CoachId == currentUserId
                                       select user) // Parent List
                                .Distinct()
                                .Select(user => new UserChatDto
                                {
                                    Id = user.Id,
                                    Name = user.Name,
                                    SurName = user.SurName,
                                    AvatarPath = user.AvatarId > 0 ? _fileRepository.Query().FirstOrDefault(g => g.Id == user.AvatarId).FilePath : "",
                                    UserType = user.UserType
                                })
                                .ToList();
                    userChats.AddRange(result);
                }

                if (currentUser.UserType == UserType.CoachLeader)
                {
                    var result = (from coachLeader in _coachLeaderCoachRepository.Query()
                                  join studentCoach in _studentCoachRepository.Query() on coachLeader.CoachId equals studentCoach.CoachId
                                  join user in _userRepository.Query() on studentCoach.UserId equals user.Id
                                  where coachLeader.UserId == currentUserId
                                  select user) // Student List
                                .Union(from coachLeader in _coachLeaderCoachRepository.Query()
                                       join studentCoach in _studentCoachRepository.Query() on coachLeader.CoachId equals studentCoach.CoachId
                                       join studentParent in _studentParentInformationRepository.Query() on studentCoach.UserId equals studentParent.UserId
                                       join user in _userRepository.Query() on studentParent.ParentId equals user.Id
                                       where coachLeader.UserId == currentUserId
                                       select user) // Parent List
                                .Distinct()
                                .Select(user => new UserChatDto
                                {
                                    Id = user.Id,
                                    Name = user.Name,
                                    SurName = user.SurName,
                                    AvatarPath = user.AvatarId > 0 ? _fileRepository.Query().FirstOrDefault(g => g.Id == user.AvatarId).FilePath : "",
                                    UserType = user.UserType
                                })
                                .ToList();
                    userChats.AddRange(result);
                }

                return new SuccessDataResult<IEnumerable<UserChatDto>>(userChats);
            }
        }
    }
}