using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    /// <summary>
    /// Karşılama Mesajları
    /// </summary>
    public class GreetingMessageDto 
    {
        public long? Id { get; set; }
        public bool HasDateRange { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public uint? DayCount { get; set; }
        public uint? Order { get; set; }
        public RecordStatus RecordStatus { get; set; }
        public long? FileId { get; set; }
        public string FilePath { get; set; }
        public string State => GetState();

        private string GetState()
        {
            DateTime today = DateTime.Now.Date;
            if (HasDateRange)
            {
                if (today < StartDate)
                {
                    return "Bekliyor";
                }
                else if (EndDate <= today)
                {
                    return "Gösterildi";
                }
                else
                {
                    return "Gösterimde";
                }
            }
            else
            {
                if (StartDate == null)
                {
                    return "Bekliyor";
                }
                else if (EndDate <= today)
                {
                    return "Gösterildi";
                }
                else
                {
                    return "Gösterimde";
                }
            }
        }

    }
}
