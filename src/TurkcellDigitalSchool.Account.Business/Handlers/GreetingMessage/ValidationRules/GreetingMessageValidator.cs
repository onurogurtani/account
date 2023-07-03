using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Commands;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.ValidationRules
{

    public class CreateGreetingMessageValidator : AbstractValidator<CreateGreetingMessageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CheckDatesMessage = Messages.CheckDates;
        private static string FieldIsNotNullOrEmpty = Core.Common.Constants.Messages.FieldIsNotNullOrEmpty;
        
        public CreateGreetingMessageValidator()
        {
            RuleFor(x => x.Entity.RecordStatus).NotNull();
            RuleFor(x => x.Entity.StartDate).NotNull().When(x => x.Entity.HasDateRange).WithMessage(CheckDatesMessage.PrepareRedisMessage());
            RuleFor(x => x.Entity.EndDate).NotNull().When(x => x.Entity.HasDateRange).WithMessage(CheckDatesMessage.PrepareRedisMessage());
            RuleFor(x => x.Entity.StartDate).GreaterThan(System.DateTime.Now.Date).When(x => x.Entity.HasDateRange).WithMessage(Messages.StartDayMustGreaterThanToday.PrepareRedisMessage());
            RuleFor(x => x.Entity.EndDate).GreaterThan(x => x.Entity.StartDate).When(x => x.Entity.HasDateRange).WithMessage(Messages.EndDayMustGreaterThanStartDay.PrepareRedisMessage());
            RuleFor(x => x.Entity.Order).NotNull().When(x => !x.Entity.HasDateRange).WithMessage(string.Format(FieldIsNotNullOrEmpty, "Gösterim Sırası").PrepareRedisMessage());
            RuleFor(x => x.Entity.Order).GreaterThanOrEqualTo(1u).When(x => !x.Entity.HasDateRange).WithMessage(string.Format("Gösterim Sırası 1 ve üzeri olabilir").PrepareRedisMessage());
            RuleFor(x => x.Entity.DayCount).NotNull().When(x => !x.Entity.HasDateRange).WithMessage(string.Format(FieldIsNotNullOrEmpty, "Gösterim Süresi").PrepareRedisMessage());
            RuleFor(x => x.Entity.DayCount).GreaterThanOrEqualTo(1u).When(x => !x.Entity.HasDateRange).WithMessage(string.Format("Gösterim Süresi 1 ve üzeri olabilir").PrepareRedisMessage());
        }
    }
    public class UpdateGreetingMessageValidator : AbstractValidator<UpdateGreetingMessageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CheckDatesMessage = Messages.CheckDates;
        private static string FieldIsNotNullOrEmpty = Core.Common.Constants.Messages.FieldIsNotNullOrEmpty;
        public UpdateGreetingMessageValidator()
        {
            RuleFor(x => x.Entity.Id).NotNull();
            RuleFor(x => x.Entity.RecordStatus).NotNull();
            RuleFor(x => x.Entity.StartDate).NotNull().When(x => x.Entity.HasDateRange).WithMessage(CheckDatesMessage.PrepareRedisMessage());
            RuleFor(x => x.Entity.EndDate).NotNull().When(x => x.Entity.HasDateRange).WithMessage(CheckDatesMessage.PrepareRedisMessage());
            RuleFor(x => x.Entity.StartDate).GreaterThan(System.DateTime.Now.Date).When(x => x.Entity.HasDateRange).WithMessage(Messages.StartDayMustGreaterThanToday.PrepareRedisMessage());
            RuleFor(x => x.Entity.EndDate).GreaterThan(x => x.Entity.StartDate).When(x => x.Entity.HasDateRange).WithMessage(Messages.EndDayMustGreaterThanStartDay.PrepareRedisMessage());
            RuleFor(x => x.Entity.Order).NotNull().When(x => !x.Entity.HasDateRange).WithMessage(string.Format(FieldIsNotNullOrEmpty, "Gösterim Sırası").PrepareRedisMessage());
            RuleFor(x => x.Entity.Order).GreaterThanOrEqualTo(1u).When(x => !x.Entity.HasDateRange).WithMessage(string.Format("Gösterim Sırası 1 ve üzeri olabilir").PrepareRedisMessage());
            RuleFor(x => x.Entity.DayCount).NotNull().When(x => !x.Entity.HasDateRange).WithMessage(string.Format(FieldIsNotNullOrEmpty, "Gösterim Süresi").PrepareRedisMessage());
            RuleFor(x => x.Entity.DayCount).GreaterThanOrEqualTo(1u).When(x => !x.Entity.HasDateRange).WithMessage(string.Format("Gösterim Süresi 1 ve üzeri olabilir").PrepareRedisMessage());
        }
    }
}