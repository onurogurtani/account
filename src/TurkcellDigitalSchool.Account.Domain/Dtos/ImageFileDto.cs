﻿namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class ImageFileDto
    {
        public byte[] Image { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
