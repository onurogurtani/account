using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.Session;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserSessionRepository : EfEntityRepositoryBase<UserSession, AccountDbContext>, IUserSessionRepository
    {
        private readonly RedisService _redisService;
        public UserSessionRepository(AccountDbContext context, RedisService redisService) : base(context)
        {
            _redisService = redisService;
        }

        public UserSession GetByToken()
        {
            var userSession = Get(w => w.UserId == TokenHelper.GetUserIdByCurrentToken() && w.SessionType == TokenHelper.GetSessionTypeByCurrentToken());
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
            // todo: Redis tarafında bu işlem için bir gerek yok ilerde ortaya çıkan bişey olursa kontrol edilecek. Orkun Kozan
            #region Update On Redis
            //if (_redisService.Connect())
            //{
            //    var targetRedisDatabase = _redisService.GetDb(CachingConstants.UserPropertiesDb);

            //    var targetUserId = _entity?.UserId ?? entity.UserId;
            //    try
            //    {
            //        targetRedisDatabase.HashSet("nbf" + entity.SessionType.ToString(), targetUserId, entity.NotBefore);
            //    }
            //    catch (Exception)
            //    {
            //        // Redis server'daki hatalardan dolayı sorun oldu. Hata durumundaki işleyiş yapılacak. 
            //    }
            //}
            //else
            //{
            //    throw new RedisConnectionException(ConnectionFailureType.UnableToConnect, "Redis sunucusuna bağlanılamıyor..");
            //}

            #endregion Update On Redis 

            return entity;
        }

        public async Task Logout(long id)
        {
            var userSession = await Context.UserSessions.Where(w => w.Id == id).FirstOrDefaultAsync();
            if (userSession != null) { return; }
            userSession.EndTime = DateTime.Now;
            await Context.SaveChangesAsync();
            var sessionInfo = await _redisService.GetAsync<UserSessionInfo>(CachingConstants.UserSession, userSession.UserId.ToString());
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
            await _redisService.SetAsync(CachingConstants.UserSession, userSession.UserId.ToString(), sessionInfo);
        }

    }
}
