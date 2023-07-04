using System;
using System.Reflection.Metadata.Ecma335;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserSessionDto
    {
        public long Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime CurrentEndTime { 
            get => EndTime == null ? System.DateTime.Now : EndTime.Value;
        }
        public TimeSpan TotalSessionTimeSpan
        {
            get => StartTime - CurrentEndTime;
        }
        public int TotalSessionHours
        {
            get => (int)TotalSessionTimeSpan.TotalHours % 24;
        }
        public int TotalSessionMinutes
        {
            get => (int)TotalSessionTimeSpan.TotalMinutes % 60;
        }
        public string TotalSessionTimeText
        {
            get => $"{TotalSessionTimeSpan.TotalDays} Gün, {TotalSessionHours} Saat, {TotalSessionMinutes} Dakika";
        }
    }
}