﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class UnverifiedUserAddedBirthDateFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "birthdate",
                schema: "account",
                table: "unverifieduser",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "birthdate",
                schema: "account",
                table: "unverifieduser",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);
        }
    }
}
