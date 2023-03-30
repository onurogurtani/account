using System.Linq;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.ValidationRules
{

    public class CreateOrganisationChangeRequestValidator : AbstractValidator<CreateOrganisationChangeRequestCommand>
    {
        public CreateOrganisationChangeRequestValidator()
        {
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents).NotEmpty().Must(x => x.Count > 0).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x=>x.PropertyEnum== Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).Select(x=>x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CityId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CountyId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationMail).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().EmailAddress().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.ContactPhone).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(20).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationWebSite).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
        }
    }
    public class UpdateOrganisationChangeRequestValidator : AbstractValidator<UpdateOrganisationChangeRequestCommand>
    {
        public UpdateOrganisationChangeRequestValidator()
        {
            RuleFor(x => x.OrganisationInfoChangeRequest.Id).NotEmpty();
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents).NotEmpty().Must(x => x.Count > 0).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CityId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CountyId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationMail).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().EmailAddress().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.ContactPhone).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(20).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationWebSite).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");

        }
    }

}