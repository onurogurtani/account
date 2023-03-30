using System;
using System.Threading.Tasks;
using Flurl.Http;
using Microsoft.Extensions.Configuration;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication.TurkcellFastLoginService
{
    public class TurkcellFastLoginService : ITurkcellFastLoginService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _redirectUri;

        private readonly string _tokenValidationUrl;
        private readonly string _userVerificationUrl;
        public TurkcellFastLoginService(IConfiguration configuration)
        {
            _clientId = configuration["TurkcellFastLoginConfiguration:ClientId"];
            _clientSecret = configuration["TurkcellFastLoginConfiguration:ClientSecret"];
            _redirectUri = configuration["TurkcellFastLoginConfiguration:RedirectUri"];

            _tokenValidationUrl = configuration["TurkcellFastLoginConfiguration:TokenValidationUrl"];
            _userVerificationUrl = configuration["TurkcellFastLoginConfiguration:UserVerificationUrl"];
        }

        public async Task<TurkcellFastLoginValidationModel> ValidateAsync(string authenticationCode)
        {
            if (string.IsNullOrEmpty(_clientId) || string.IsNullOrEmpty(_clientSecret) || string.IsNullOrEmpty(_tokenValidationUrl)) { throw new ArgumentNullException("Client Id, Client Secret ve ValidationUrl Boş ya da Null Olamaz"); }
            if (string.IsNullOrEmpty(authenticationCode)) { throw new ArgumentNullException("authenticationCode Boş ya da Null Olamaz"); }

            var resultModel = new TurkcellFastLoginValidationModel();

            var data = new
            {
                code = authenticationCode,
                grant_type = "authorization_code",
                redirect_uri = _redirectUri
            };
            var response = await _tokenValidationUrl.WithBasicAuth(_clientId, _clientSecret).PostUrlEncodedAsync(data).ReceiveJson();

            if (response == null)
            {
                resultModel.Result = false;
                resultModel.Message = "İşlem yapılırken bir hata oluştu.. OAuth doğrulama isteği atılamadı..";

                return resultModel;
            }
            else
            {
                resultModel.Result = true;
                resultModel.Message = "İşlem başarılı";

                resultModel.AccessToken = response.access_token;
                resultModel.TokenType = response.token_type;
                resultModel.ExpiresIn = response.expires_in;
                resultModel.IdToken = response.id_token;

                return resultModel;
            }
        }

        public async Task<TurkcellFastLoginUserInfoModel> GetUserInfoAsync(string userAccessToken)
        {
            if (string.IsNullOrEmpty(_clientId) || string.IsNullOrEmpty(_clientSecret) || string.IsNullOrEmpty(_userVerificationUrl)) { throw new ArgumentNullException("Client Id, Client Secret ve UserVerificationUrl Boş ya da Null Olamaz"); }
            if (string.IsNullOrEmpty(userAccessToken)) { throw new ArgumentNullException("userAccessToken Boş ya da Null Olamaz"); }

            var resultModel = new TurkcellFastLoginUserInfoModel();

            var data = new { };
            var response = await _userVerificationUrl.WithOAuthBearerToken(userAccessToken).PostUrlEncodedAsync(data).ReceiveJson();

            if (response != null)
            {
                resultModel.Sub = response.sub;
                resultModel.UpdatedAt = new DateTime((long)response.updated_at, DateTimeKind.Utc);
                resultModel.Name = response.name;
                resultModel.Surname = response.family_name;
                resultModel.Email = response.email;
                resultModel.IsEmailVerified = (bool)response.email_verified;
                resultModel.PhoneNumber = response.phone_number;
                resultModel.IsPhoneNumberVerified = (bool)response.phone_number_verified;

                return resultModel;
            }

            return null;
        }

        public async Task<TurkcellFastLoginResultModel> ValidateAndGetUserInfoAsync(string authenticationCode)
        {
            var resultModel = new TurkcellFastLoginResultModel();

            var validationResult = await ValidateAsync(authenticationCode);
            resultModel.ValidationInformation = validationResult;

            if (validationResult.Result == true)
            {
                var userResult = await GetUserInfoAsync(validationResult.AccessToken);

                if (userResult != null)
                {
                    resultModel.UserInformation = userResult;

                    resultModel.Result = true;
                    return resultModel;
                }
            }

            resultModel.Result = false;
            return resultModel;
        }

    }
}
