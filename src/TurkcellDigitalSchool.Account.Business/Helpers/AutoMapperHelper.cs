using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using System.Linq;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Account.Domain.Dtos; 
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService.Model;

namespace TurkcellDigitalSchool.Account.Business.Helpers
{
    [ExcludeFromCodeCoverage]
    public class AutoMapperHelper : Profile
    {
        public AutoMapperHelper()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, CurrentUserDto>().ReverseMap();
            CreateMap<School, SchoolExcelDto>().ReverseMap();
            CreateMap<Document, Document>().ReverseMap();
            CreateMap<Document, DocumentDto>().ReverseMap();
            CreateMap<File, AvatarFilesDto>().ReverseMap();
            CreateMap<File, FileDto>().ReverseMap();
            CreateMap<Package, StudentAnswerTargetRangePackageDto>().ReverseMap();
            CreateMap<StudentAnswerTargetRange, StudentAnswerTargetRangeResponse>().ReverseMap();
            CreateMap<CreateUpdateAdminDto, User>().ReverseMap();
            CreateMap<AdminDto, User>().ReverseMap();
            CreateMap<UserDto, User>().ReverseMap();

            CreateMap<TestExam, TestExam>().ReverseMap();

            CreateMap<TestExamType, TestExamType>().ReverseMap();

            CreateMap<PackageTestExam, PackageTestExam>().ReverseMap()
               .ForMember(dest => dest.UpdateTime, act => act.Ignore())
               .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
               .ForMember(dest => dest.InsertTime, act => act.Ignore())
               .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<Package, Package>().ReverseMap()
               .ForMember(dest => dest.UpdateTime, act => act.Ignore())
               .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
               .ForMember(dest => dest.InsertTime, act => act.Ignore())
               .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<Organisation, Organisation>().ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<Organisation, OrganisationDto>().ReverseMap();

            CreateMap<OrganisationType, OrganisationType>().ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<ContractType, ContractType>().ReverseMap()
               .ForMember(dest => dest.UpdateTime, act => act.Ignore())
               .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
               .ForMember(dest => dest.InsertTime, act => act.Ignore())
               .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<ContractKind, ContractKind>().ReverseMap()
               .ForMember(dest => dest.UpdateTime, act => act.Ignore())
               .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
               .ForMember(dest => dest.InsertTime, act => act.Ignore())
               .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<Package, GetPackageForUserResponseDto>()
                .ForMember(dest => dest.Lessons, act => act.MapFrom(m => m.PackageLessons.Select(s => s.Lesson.Name).ToList()))
                .ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<Package, GetPackagesForUserResponseDto>()
                .ForMember(dest => dest.Lessons, act => act.MapFrom(m => m.PackageLessons.Select(s => s.Lesson.Name).ToList()))
                .ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<Role, AddRoleDto>().ReverseMap();
            CreateMap<Role, UpdateRoleDto>().ReverseMap();
            CreateMap<Role, GetRoleDto>().ReverseMap();

            CreateMap<RoleClaim, RoleClaim>().ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<RoleClaim, AddRoleClaimDto>().ReverseMap();
            CreateMap<RoleClaim, UpdateRoleClaimDto>().ReverseMap();
            CreateMap<RoleClaim, GetRoleClaimDto>().ReverseMap();

            CreateMap<UserRole, UserRole>().ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<UserPackage, UserPackage>().ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<PackageRole, PackageRole>().ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<User, GetTeacherResponseDto>().ReverseMap();
            CreateMap<User, GetTeachersResponseDto>().ReverseMap();

            CreateMap<OrganisationUser, OrganisationUser>().ReverseMap()
                .ForMember(dest => dest.UpdateTime, act => act.Ignore())
                .ForMember(dest => dest.UpdateUserId, act => act.Ignore())
                .ForMember(dest => dest.InsertTime, act => act.Ignore())
                .ForMember(dest => dest.InsertUserId, act => act.Ignore());

            CreateMap<OrganisationTypeDto, OrganisationType>().ReverseMap();

            CreateMap<OrganisationInfoChangeRequest, Domain.Dtos.OrganisationChangeReqContent>().ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RequestId));

            CreateMap<OrganisationInfoChangeRequest, AddOrganisationInfoChangeRequestDto>().ReverseMap();
            CreateMap<OrganisationInfoChangeRequest, UpdateOrganisationInfoChangeRequestDto>().ReverseMap();
            CreateMap<OrganisationInfoChangeRequest, GetOrganisationInfoChangeRequestDto>().ReverseMap();

            CreateMap<Domain.Concrete.OrganisationChangeReqContent, AddOrganisationChangeReqContentDto>().ReverseMap();
            CreateMap<Domain.Concrete.OrganisationChangeReqContent, UpdateOrganisationChangeReqContentDto>().ReverseMap();
            CreateMap<Domain.Concrete.OrganisationChangeReqContent, GetOrganisationChangeReqContentDto>().ReverseMap();

            CreateMap<ConstantMessageDtos, MessageMap>().ReverseMap();

        }
    }
}
