﻿using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class LessonEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, Lesson>
    {
        public LessonEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.Lesson_Added")]
        public override async Task Added(Lesson entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.Lesson_Modified")]
        public override async Task Updated(Lesson entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.Lesson_Deleted")]
        public override async Task Deleted(Lesson entity)
        {
            await base.Deleted(entity);
        }
    }
}
