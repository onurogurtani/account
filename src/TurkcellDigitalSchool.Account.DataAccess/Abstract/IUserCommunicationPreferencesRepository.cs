﻿using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUserCommunicationPreferencesRepository : IEntityRepository<UserCommunicationPreferences>
    {
    }
}
