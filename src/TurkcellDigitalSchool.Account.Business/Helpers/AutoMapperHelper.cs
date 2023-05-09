using AutoMapper;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Business.Helpers
{
    public class AutoMapperHelper : Profile
    {
        public AutoMapperHelper()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, CurrentUserDto>().ReverseMap();
            CreateMap<School, SchoolExcelDto>().ReverseMap();
        }
    }
}
