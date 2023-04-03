
namespace TurkcellDigitalSchool.Account.Business.Constants
{
    /// <summary>
    /// This class was created to get rid of magic strings and write more readable code.
    /// </summary>
    public static class Messages
    {
#pragma warning disable CA2211
#pragma warning disable S2223
#pragma warning disable S1104
        public static string PackageNameAldreadyExist = "Girdiğiniz paket adına  sahip aktif paket bulunmaktadır, lütfen girdiğiniz bilgileri kontrol ediniz";
        public static string AuthorizationsDenied = "AuthorizationsDenied";
        public static string Added = "İşleminiz Başarıyla Gerçekleştirildi.";
        public static string Deleted = "İşleminiz Başarıyla Gerçekleştirildi.";
        public static string Updated = "İşleminiz Başarıyla Gerçekleştirildi.";
        public static string UserNotFound = "Kullanıcı Bulunamadı";
        public static string MultipleUsersFound = "Birden Kullanıcı Bulunamadı";
        public static string PassError = "Kullanıcı Adı ve / veya Şifresi Hatalı.";
        public static string CouldNotValidate = "Bilgiler doğrulanamadı";
        public static string CurrentPassError = "Mevcut Şifre Bilgisini Yanlış Girdiniz, Kontrol Ediniz.";
        public static string InvalidPass = "Girmiş olduğunuz şifre, şifre kurallarına uygun değildir.";
        public static string SuccessfulLogin = "Login İşlemi Başarılı";
        public static string SuccessfulUserVerify = "Kullanıcı Doğrulama İşlemi Başarılı";
        public static string SendMobileCode = "SendMobileCode";
        public static string NameAlreadyExist = "Kullanıcı Adı Zaten Var.";
        public static string WrongCitizenId = "WrongCID";
        public static string CitizenNumber = "CID";
        public static string PassEmpty = "PassEmpty";
        public static string PassLength = "# karakter";
        public static string PassLengthMin = "En az # karakter";
        public static string PassLengthMax = "En fazla # karakter";
        public static string PassLengthMinMax = "En az #1, en fazla #2 karakter";
        public static string PassUppercaseLetter = "En az 1 büyük harf";
        public static string PassLowercaseLetter = "En az 1 küçük harf";
        public static string PassDigit = "En az 1 rakam";
        public static string PassSpecialCharacter = "En az 1 özel karakter";
        public static string SendPass = "SendPass";
        public static string InvalidCode = "InvalidCode";
        public static string SmsServiceNotFound = "SmsServiceNotFound";
        public static string TrueButCellPhone = "TrueButCellPhone";
        public static string TokenProviderException = "TokenProviderException";
        public static string Unknown = "Unknown";
        public static string NewPass = "NewPass";
        public static string InvalidPhoneNumber = "Geçersiz Telefon ";
        public static string SendMobileCodeSuccessfully = "SMS gönderildi. Gönderilen kodu 120 saniye içinde giriniz.";
        public static string UnableToProccess = "İşleminizi Gerçekleştiremiyoruz.";
        public static string InvalidCaptchaKey = "Captcha bilgisini yanlış girdiniz, lütfen tekrar deneyiniz.";
        public static string SuccessfulLogOut = "LogOut İşlemi Başarılı";
        public static string SuccessfulOperation = "İşleminiz Başarıyla Gerçekleştirildi.";
        public static string ParameterIsNotValid = "Gönderilen parametre gecerli değil";

        public static string LogoPathIsNotDefined = "Logonun kayıt edileceği path bilgisi uygulama ayarlarında tanımlı değil";
        public static string NumberMustBe10Digit = "10 karakter uzunluğunda olmalıdır !";
        public static string OnlyNumbersAreSentInthePhoneNumber = "Telefon numarasında sadece rakam gönderilmelidir!";
        public static string ValueIsNotValidForField = "{0} Alanı için sadece belirtilen değerler gönderilir ! ( {1} ) ";

        public static string InvalidAuthenticationDueToNewLoginDetected = "Yeni bir giriş tespit edildiği için bu oturum artık geçersiz";
        public static string FailLoginCount = "Hatalı giriş sayısı #{0}#";

        public static string UserIsNotTeacher = "Kullanıcı öğretmen değil";
        public static string FileIsNotExcel = "Dosya excel dosyası olmalıdır";
        public static string ExcelNumberOfColumnsNotValid = "Kolon sayıları eşit değil {0} olmalıdır";

        public static string RoleAdded = "{0} rolü ve yetkileri başarıyla kaydedildi.";
        public static string RoleUpdated = "{0} rolü ve yetkilerdeki değişiklikler kaydedildi.";
        public static string RoleTypeCantChanged = "Kullanıcı tanımlı olduğu ya da paketle tanımlı olan rol tipi değiştirilemez.";
        public static string TranferRoleIsNotActive = "Transfer etmek istediğiniz rol aktif değil.";
        public static string RoleIsAlreadyActive = "Rol zaten aktif.";
        public static string RoleandTransferRoleCantBeTheSame = "Pasif etmek istediğiniz rol ile transfer etmek istediğiniz rol aynı olamaz.";
        public static string CanNotChangeForRealationOrganisation = "Kurum Tipi, Kurumsal Müşteri Listesindeki kayıtlar ile ilişkilendirilmiştir. Değişiklik yapılamaz.";
#pragma warning restore CA2211
#pragma warning restore S2223
#pragma warning restore S1104
    }
}