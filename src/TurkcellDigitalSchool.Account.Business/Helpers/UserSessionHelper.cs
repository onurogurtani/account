using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Helpers
{
    public static class UserSessionHelper
    {
        public static DateTime StartOfWeek()
        {
            DateTime today = System.DateTime.Now.Date;
            int diff = (7 + (today.DayOfWeek - DayOfWeek.Monday)) % 7;
            return today.AddDays(-1 * diff).Date;
        }
        public static int TotalTime(List<UserSession> list, DateTime time1, DateTime time2)
        {
            int totalMinutes = 0;  
            foreach (var item in list)
            {
                DateTime startTime = item.StartTime;
                DateTime? endTime = item.EndTime;
                
                if (item.StartTime < time1)
                {
                    startTime = time1;
                }


                if (item.EndTime == null)
                { 
                    if ((DateTime.Now - startTime).TotalMinutes > (12 * 60))
                    {
                        endTime = startTime.AddMinutes(60);
                    }
                    else
                    {
                        endTime = DateTime.Now;
                    }
                    
                }
                else if (item.EndTime > time2)
                {
                    endTime = time2;
                }

                totalMinutes += Math.Abs((int)(endTime - startTime).Value.TotalMinutes);  
            }
            return totalMinutes;
        }

        public static string TotalTimeToString(int totalMinutes)
        {
            string hours = (totalMinutes / 60).ToString().PadLeft(2, '0');
            string minutes = (totalMinutes % 60).ToString().PadLeft(2, '0');

            return $"{hours} saat {minutes} dakika";
        }

        public static string TotalTimeToString2(int totalMinutes)
        {
            string hours = (totalMinutes / 60).ToString().PadLeft(2, '0');
            string minutes = (totalMinutes % 60).ToString().PadLeft(2, '0');
            if (totalMinutes > 59 || totalMinutes < -59)
                return $"{hours} saat {minutes} dakika";
            else
                return $"{minutes} dakika";
        }
         
    }
}
