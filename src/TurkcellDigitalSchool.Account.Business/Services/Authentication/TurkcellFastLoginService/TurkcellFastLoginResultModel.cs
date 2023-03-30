namespace TurkcellDigitalSchool.Account.Business.Services.Authentication.TurkcellFastLoginService
{
    public class TurkcellFastLoginResultModel
    {
        public bool Result { get; set; }

        public TurkcellFastLoginValidationModel ValidationInformation { get; set; }

        public TurkcellFastLoginUserInfoModel UserInformation { get; set; }
    }
}
