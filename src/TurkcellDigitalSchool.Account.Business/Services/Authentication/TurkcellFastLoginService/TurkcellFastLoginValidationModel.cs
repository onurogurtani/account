namespace TurkcellDigitalSchool.Account.Business.Services.Authentication.TurkcellFastLoginService
{
    public class TurkcellFastLoginValidationModel
    {
        public bool Result { get; set; }

        public string Message { get; set; }

        public string AccessToken { get; set; }

        public string TokenType { get; set; }

        public string ExpiresIn { get; set; }

        public string IdToken { get; set; }
    }
}
