﻿using System.ComponentModel.DataAnnotations.Schema;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class File : EntityDefault , IReadOnlyEntity
    {
        public FileType FileType { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string ContentType { get; set; }
        public string Description { get; set; }

        /// <summary>
        /// only use if you want it. ignored Migration.
        /// </summary>
        [NotMapped]
        public byte[] FileBase64 { get; set; }
    }
}
