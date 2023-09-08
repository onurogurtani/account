using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class UnverifiedUserAddedBirthDateRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "birthdate",
                schema: "account",
                table: "unverifieduser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "birthdate",
                schema: "account",
                table: "unverifieduser",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}
