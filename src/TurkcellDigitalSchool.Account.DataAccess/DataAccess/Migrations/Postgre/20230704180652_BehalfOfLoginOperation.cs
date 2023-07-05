using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class BehalfOfLoginOperation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "behalfofloginuserid",
                table: "usersessions",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "behalfofloginkey",
                table: "user",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "behalfofloginuserid",
                table: "usersessions");

            migrationBuilder.DropColumn(
                name: "behalfofloginkey",
                table: "user");
        }
    }
}
