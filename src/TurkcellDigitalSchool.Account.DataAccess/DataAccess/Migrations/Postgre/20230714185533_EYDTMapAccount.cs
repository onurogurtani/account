using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class EYDTMapAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "eydatatransfermap",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    table = table.Column<string>(type: "text", nullable: true),
                    neweducationyearid = table.Column<long>(type: "bigint", nullable: false),
                    oldid = table.Column<long>(type: "bigint", nullable: false),
                    newid = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_eydatatransfermap", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "eydatatransfermap");
        }
    }
}
