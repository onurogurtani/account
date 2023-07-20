
using System.Security.Policy;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;

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
        public static string PasswordChangeTimeFinished = "Parola değiştirme süresi dolmuştur !";
        public static string oldPassIsNotCorrect = "Girmiş olduğunuz eski parolanız hatalıdır !";
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
        public static string PassLengthMax = "En fazla {0} karakter olabilir.";
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
        public static string SendMobileCodeSuccessfully = "SMS gönderildi. Gönderilen kodu " + OtpConst.OtpExpSec + " saniye içinde giriniz.";
        public static string UnableToProccess = "İşleminizi Gerçekleştiremiyoruz.";
        public static string InvalidCaptchaKey = "Captcha bilgisini yanlış girdiniz, lütfen tekrar deneyiniz.";
        public static string SuccessfulLogOut = "LogOut İşlemi Başarılı";
        public static string SuccessfulOperation = "İşleminiz Başarıyla Gerçekleştirildi.";
        public static string ParameterIsNotValid = "Gönderilen parametre gecerli değil";
        public static string UserInformations = "Kullanıcı adınız: {0} {1} \nŞifreniz: {2} şeklinde belirlenmiştir. {3} linki üzerinden sisteme giriş yapabilirsiniz.";
        public static string LogoPathIsNotDefined = "Logonun kayıt edileceği path bilgisi uygulama ayarlarında tanımlı değil";
        public static string NumberMustBe10Digit = "10 karakter uzunluğunda olmalıdır !";
        public static string CannotBeLowerThanZero = "{0} 0'dan büyük olmalıdır.";
        public static string MustBeOnlyLetter = "{0} sadece harflerden oluşmalıdır.";
        public static string CitizenIdMust11Digits = "TCKN 11 hane olmalıdır.";
        public static string PackageIsNotFound = "Paket bulunamadı !";
        public static string PackageTestExamExamKindError = "Paketin Sınav türü ile seçilen Deneme Sınavı Paketinin türü aynı olmalı!";
        public static string PackageExamKindError = "Paketin Sınav türü ile seçilen Deneme Sınavının türü aynı olmalı!";
        public static string CoachServicePackageError = "Koçluk Hizmeti Paketleri seçimlerinin türü hatalı!";
        public static string MotivationPackageError = "Motivasyon Paketleri seçimlerinin türü hatalı!";
        public static string TargetRangeIsAlreadyExist = "Bu paketin, net hedef aralığı daha önce eklenmiştir.";
        public static string CheckDates = "Lütfen girilen tarihleri kontrol ediniz.";
        public static string MinImageOfPackage = "En az {0} Paket Görseli eklenmeli.";
        public static string MaxImageOfPackage = "En fazla {0} Paket Görseli eklenebilir.";
        public static string MotivationIsNotExistCannotChoose = "Motivasyon Yoktur ise  motivasyon ile ilgili seçimler yapılamaz";
        public static string ShouldChooseCoachServicePackage= "Koçluk Hizmeti Paketi seçim yapmanız gerekmektedir";
        public static string ShouldChooseMotivationEvent = "Motivasyon etkinliği seçim yapmanız gerekmektedir";
        public static string MotivationTabsOnlyOneChoose = "Motivasyon sekmelerden sadece seçtiğiniz bir tanesi üzerinde seçim yapabilirsiniz";
        public static string MotivationTabsHaveToChoose = " Motivasyon  sekmelerden  seçtiğiniz bir tanesi üzerinde seçim yapmanız gerekmektedir";
        public static string TestExamIsNotExistCannotChoose = "Deneme Sınavı Yoktur ise  deneme sınavı ile ilgili seçimler yapılamaz";
        public static string ShouldChooseTestExam = "Deneme Sınavı seçim yapmanız gerekmektedir";
        public static string TestExamTabsOnlyOneChoose = "Deneme Sınavı  sekmelerden sadece seçtiğiniz bir tanesi üzerinde seçim yapabilirsiniz";
        public static string TestExamTabsHaveToChoose = "Deneme Sınavı sekmelerden  seçtiğiniz bir tanesi üzerinde seçim yapanız gerekmektedir";

        public static string OnlyNumbersAreSentInthePhoneNumber = "Telefon numarasında sadece rakam gönderilmelidir!";
        public static string ValueIsNotValidForField = "{0} Alanı için sadece belirtilen değerler gönderilir ! ( {1} ) ";

        public static string InvalidAuthenticationDueToNewLoginDetected = "Yeni bir giriş tespit edildiği için bu oturum artık geçersiz";
        public static string FailLoginCount = "Hatalı giriş sayısı #{0}#";

        public static string UserIsNotTeacher = "Kullanıcı öğretmen değil";
        public static string FileIsNotExcel = "Dosya excel dosyası olmalıdır";
        public static string ExcelNumberOfColumnsNotValid = "Kolon sayıları eşit değil {0} olmalıdır";

        public static string RoleAdded = "{0} rolü ve yetkileri başarıyla kaydedildi.";
        public static string RoleUpdated = "{0} rolü ve yetkilerdeki değişiklikler kaydedildi.";
        public static string UserTypeCantChanged = "Kullanıcı tanımlı olduğu ya da paketle tanımlı olan Kullanıcı tipi değiştirilemez.";
        public static string TranferRoleIsNotActive = "Transfer etmek istediğiniz rol aktif değil.";
        public static string RoleIsAlreadyActive = "Rol zaten aktif.";
        public static string RoleandTransferRoleCantBeTheSame = "Pasif etmek istediğiniz rol ile transfer etmek istediğiniz rol aynı olamaz.";
        public static string CanNotChangeForRealationOrganisation = "Kurum Tipi, Kurumsal Müşteri Listesindeki kayıtlar ile ilişkilendirilmiştir. Değişiklik yapılamaz.";
        public static string InvalidOtpCode = "Girdiğiniz Doğrulama Kodu Yanlış, Lütfen Tekrar Deneyiniz";
        public static string InvalidOtpId = "Hatalı otp kayıt Id. İşleme devam edilemez !";
        public static string PhoneNotVerify = "Telefon numarası doğrulaması yapılmamış !";
        public static string MailIsNotVerify = "E-Posta Doğrulaması yapılmamış işleme devam edilemez !";
        public static string NotFountValidUser = "Geçerli bir kullanıcı sistemde bulunamadı !";
        public static string PasswordChangeLinkSended = "Lütfen {0} gönderdiğimiz linke tıklayarak şifreni sıfırla";
        public static string PasswordChangeTimeExpired = "Şifre yenileme süresi dolmuştur. İşleme devam edilemez !";
        public static string PasswordNotEqual = "Şifreler eşit değil işleme devam edilemez!";
        public static string PasswordChanged = "Şifreniz değiştirildi.";
        public static string CanNotChangeForRelationOrganisation = "Kurum Tipi, Kurumsal Müşteri Listesindeki kayıtlar ile ilişkilendirilmiştir. Değişiklik yapılamaz.";
        public static string OtpTimeIsFinished = "Otp doğrulama süresi doldu. Tekrar otp kodu gönderiniz !";
        public static string otpIsNotReUsed = "Daha önce kullanılan bir otp kodu. İşleme devam edilemez. Tekrar otp kodu gönderiniz !";
        public static string PasswordChangeLinkTimeout = "Şifre değişitrme linknin süresi dolmuş. İşleme devam edilemez !";
        public static string PasswordChangeLinkIsUsed = "Şifre değişitrme linki daha önce kullanılmış. İşleme devam edilemez !";
        public static string PasswordChange = "Şifre değişitrme linki daha önce kullanılmış. İşleme devam edilemez !";
        public static string otpKodeIsUsed = "Daha önce kullanılan bir otp kodu. İşleme devam edilemez";
        public static string otpNotThisUser = "Otp kodu kullanıcı ile eşleşmiyor. İşleme devam edilemez !";
        public static string XIdIsNotCorrenctFormat = "XId Parametresi uygun formatta değildir. İşleme devam edilemez !";
        public static string EnterDifferentEmail = "Kullandığınız e-postadan farklı bir adres giriniz.";
        public static string UserNameAlreadyExist = "Bu kullanıcı adı(Nickname) kullanımda.";
        public static string RecordsDoesNotExist = "{0} bulunamadı!";

        public static string CommunicationChannelOneOpen = "En az 1 adet iletişim kanalı açık olmalıdır";
        public static string CommunicationChannelRequiredPhone = "Bu kanalı seçmek için telefon bilgisi eklemelisiniz";
        public static string CommunicationChannelVerifyPhone = "Bu kanalını seçmek için telefon bilgisi doğrulanmalıdır";
        public static string OnlyOneCanBeSelected = "Sadece bir tane seçilebilir";
        public static string YouMustChoose = "Seçim yapmalısınız";

        public static string DocumentAlreadyExist = "“Bu sözleşme daha önce tanımlanmış. Lütfen alanları kontrol ediniz ya da versiyon güncelleyiniz.";
        public static string GreetingMessageAlreadyExist = "Bu karşılama mesajı daha önce tanımlanmış.";
        public static string GreetingMessageTodayControl = "Bugün için mesaj girilemez.";
        public static string GreetingMessageDateConflict = "Bu tarih aralığında tanımlanmış karşılama mesajı zaten mevcut.";
        public static string Waiting = "Bekliyor";
        public static string Showing = "Gösterimde";
        public static string Showed = "Gösterildi";
        public static string EndDayMustGreaterThanStartDay = "Bitiş tarihi başlangıç tarihinden sonra olmalıdır.";
        public static string StartDayMustGreaterThanToday = "Başlangıç tarihi bugünün tarihinden sonra olmalıdır.";
        public static string BadSessionType = "Hatalı Client tipi. İşleme devam edilemez.";
        public static string UserPackageNotFound = "Kullanıcıya ait paket yoktur !" ;

#pragma warning restore CA2211
#pragma warning restore S2223
#pragma warning restore S1104
    }
}