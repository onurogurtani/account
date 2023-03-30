using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserSessionRepository : EfEntityRepositoryBase<UserSession, ProjectDbContext>, IUserSessionRepository
    {
        private readonly RedisService _redisService;
        public UserSessionRepository(ProjectDbContext context) : base(context)
        {
            _redisService = ServiceTool.ServiceProvider.GetService<RedisService>(); // Test projesinde UserSessionRepository new()'lenerek çağırıldığı için Constructor yerine burada çağrıldı
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

    }
}
