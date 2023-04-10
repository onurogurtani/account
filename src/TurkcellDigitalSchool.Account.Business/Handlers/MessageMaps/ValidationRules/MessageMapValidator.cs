using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.ValidationRules
{

    public class CreateMessageMapValidator : AbstractValidator<CreateMessageMapCommand>
    {
        public CreateMessageMapValidator()
        {
        }
    }
    public class UpdateMessageMapValidator : AbstractValidator<UpdateMessageMapCommand>
    {
        public UpdateMessageMapValidator()
        {
        }
    }
}