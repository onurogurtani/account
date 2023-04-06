namespace TurkcellDigitalSchool.IdentityServerService.Constants
{
    public static class Messages
    {
        public static string PassError = "Kullanıcı Adı ve / veya Şifresi Hatalı.";
        public static string FailLoginCount = "Hatalı giriş sayısı #{0}#";
        public static string LoginFail= "Girilen bilgiler hatalıdır, tekrar giriş yapınız";
        public static string InvalitToken = "Hatalı token gönderimi yapıldı. İşleme devam edilemez !";
        public static string captchaKeyIsNotValid = "Geçerli bir captcha key göndermelisiniz !";
        public static string ClientTanimliDegil = "Sistemde tanımlı client bilgisine ulaşılamadı ! Client Adı : {0}";
    }
}
