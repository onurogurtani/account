using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class Add_GraduateYear_fields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "graduationyear",
                table: "studenteducationinformation",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "graduationyear",
                table: "education",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "graduationyear",
                table: "studenteducationinformation");

            migrationBuilder.DropColumn(
                name: "graduationyear",
                table: "education");
        }
    }
}
