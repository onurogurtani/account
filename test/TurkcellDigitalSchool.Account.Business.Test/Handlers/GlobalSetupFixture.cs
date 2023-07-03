using NUnit.Framework;
using TurkcellDigitalSchool.Core.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers
{
    [SetUpFixture]
    public class GlobalSetupFixture
    {
        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            RedisHelper.IsUnitTest = true;
        }

        [OneTimeTearDown]
        public void RunAfterAnyTests()
        {
            // Tüm testlerden sonra bu metot çalışacak
        }
    }
}
