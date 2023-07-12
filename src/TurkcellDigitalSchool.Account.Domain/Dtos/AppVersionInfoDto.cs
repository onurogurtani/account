using System;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class AppVersionInfoDto
    {
        public string Version { get; set; }
        public string MinVersion { get; set; }
        public string AppUrl { get; set; }

        public bool IsForceUpdate
        {
            get
            {
                var version1 = new Version(Version);
                var version2 = new Version(MinVersion);
                var result = version1.CompareTo(version2);
                return result < 0;
            }
        }

    }
}
