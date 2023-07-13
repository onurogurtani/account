using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class GreetingMessageTextFormat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "contentalignment",
                table: "greetingmessage",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "contentforecolor",
                table: "greetingmessage",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "descriptionforecolor",
                table: "greetingmessage",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "contentalignment",
                table: "greetingmessage");

            migrationBuilder.DropColumn(
                name: "contentforecolor",
                table: "greetingmessage");

            migrationBuilder.DropColumn(
                name: "descriptionforecolor",
                table: "greetingmessage");
        }
    }
}
