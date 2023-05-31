namespace TurkcellDigitalSchool.IdentityServerService.Constants
{
    public static class Messages
    {
        public static string PassError = "Kullanıcı Adı ve / veya Şifresi Hatalı.";
        public static string FailLoginCount = "Hatalı giriş sayısı #{0}#";
        public static string LoginFail= "Girilen bilgiler hatalıdır, tekrar giriş yapınız";
        public static string LoginFailUserNameNotExist= "Girdiğiniz T.C. kimlik no ya da e-posta bilgisi ile kayıtlı kullanıcı bulunmamaktadır.";
        public static string YouHaveNotVerifyMobilePhone= "Doğrulanmış bir cep telefonu bilgisi bulnamamaktadır.";
        public static string InvalitToken = "Hatalı token gönderimi yapıldı. İşleme devam edilemez !";
        public static string captchaKeyIsNotValid = "Geçerli bir captcha key göndermelisiniz !";
        public static string passwordIsOldMessage = "Şifre değiştirme süreniz dolmuş. Lütfen şifrenizi değiştiriniz.";
        public static string ClientTanimliDegil = "Sistemde tanımlı client bilgisine ulaşılamadı ! Client Adı : {0}";
        public static string OtpNotCreate = "Otp oluşturulamadı !";
        public static string PasswordChangeLinkSendedEMail = "Şifre yenileme linki e-posta adresine gönderilmiştir.";
        public static string LdapLoginFail = "Kullanıcı girişi başarısız.";
    }
}
