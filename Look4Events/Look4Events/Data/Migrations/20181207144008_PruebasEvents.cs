using Microsoft.EntityFrameworkCore.Migrations;

namespace Look4Events.Data.Migrations
{
    public partial class PruebasEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Url = table.Column<string>(nullable: true),
                    Locale = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");
        }
    }
}
