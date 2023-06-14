using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class TestExamReadOnly_updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "examtype",
                table: "testexam",
                newName: "examkind");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "examkind",
                table: "testexam",
                newName: "examtype");
        }
    }
}
