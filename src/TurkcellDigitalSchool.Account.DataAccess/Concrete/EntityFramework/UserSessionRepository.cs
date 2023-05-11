using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Redis;
using TurkcellDigitalSchool.Core.Services.Session;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserSessionRepository : EfEntityRepositoryBase<UserSession, AccountDbContext>, IUserSessionRepository
    {
        private readonly SessionRedisSvc _sessinRedisSvc;
        private readonly ITokenHelper _tokenHelper;
        public UserSessionRepository(AccountDbContext context, SessionRedisSvc sessinRedisSvc, ITokenHelper tokenHelper) : base(context)
        {
            _sessinRedisSvc = sessinRedisSvc;
            _tokenHelper = tokenHelper;
        }

        public UserSession GetByToken()
        {
            var userSession = Get(w => w.UserId == _tokenHelper.GetUserIdByCurrentToken() && w.SessionType == _tokenHelper.GetSessionTypeByCurrentToken());
            Context.Entry<UserSession>(userSession).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
            return userSession;
        }

        public UserSession AddUserSession(UserSession entity)
        {
            var user = Context.Users.Where(w => w.Id == entity.UserId)
                .FirstOrDefault();

            if (user != null && ((entity.SessionType == Core.Enums.SessionType.Web && user.LastWebSessionId == null) ||
                (entity.SessionType == Core.Enums.SessionType.Mobile && user.LastMobileSessionId == null)))
            {
                var openSessions = GetList(w => w.User.Id == entity.UserId && w.SessionType == entity.SessionType && w.EndTime == null);
                foreach (var itemSession in openSessions)
                {
                    itemSession.EndTime = DateTime.Now;
                    Update(itemSession);
                }
            }
            else
            {
                var sessionId = entity.SessionType == Core.Enums.SessionType.Mobile ? user.LastMobileSessionId : user.LastWebSessionId;
                var oldSession = Context.UserSessions.FirstOrDefault(w => w.Id == sessionId);
                oldSession.EndTime = DateTime.Now;
                Update(oldSession);
            }




            Add(entity);
            SaveChanges();

            if (entity.SessionType == Core.Enums.SessionType.Web)
            {
                user.LastWebSessionId = entity.Id;
                user.LastWebSessionTime = entity.StartTime;
            }
            else if (entity.SessionType == Core.Enums.SessionType.Mobile)
            {
                user.LastMobileSessionId = entity.Id;
                user.LastMobileSessionTime = entity.StartTime;
            }
            Context.SaveChanges();




            return entity;
        }

        public async Task Logout(long id)
        {
            var userSession = await Context.UserSessions.Where(w => w.Id == id).FirstOrDefaultAsync();
            if (userSession != null) { return; }
            userSession.EndTime = DateTime.Now;
            await Context.SaveChangesAsync();
            var sessionInfo = await _sessinRedisSvc.GetAsync<UserSessionInfo>(userSession.UserId.ToString());
            if (sessionInfo == null)
            {
                sessionInfo = new UserSessionInfo();
            }

            if (userSession.SessionType == SessionType.Mobile)
            {
                sessionInfo.SessionIdMobil = 0;
            }
            else if (userSession.SessionType == SessionType.Web)
            {
                sessionInfo.SessionIdWeb = 0;
            }
            await _sessinRedisSvc.SetAsync(userSession.UserId.ToString(), sessionInfo);
        }

    }
}
