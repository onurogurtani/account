using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication.TurkcellFastLoginService
{
    internal interface ITurkcellFastLoginService
    {
        Task<TurkcellFastLoginValidationModel> ValidateAsync(string authenticationCode);

        Task<TurkcellFastLoginUserInfoModel> GetUserInfoAsync(string userAccessToken);

        Task<TurkcellFastLoginResultModel> ValidateAndGetUserInfoAsync(string authenticationCode);
    }
}
