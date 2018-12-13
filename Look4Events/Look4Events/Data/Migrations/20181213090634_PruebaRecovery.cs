using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Look4Events.Data.Migrations
{
    public partial class PruebaRecovery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Locale",
                table: "Events");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaNacimiento",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaRegistro",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LugarDeOrigen",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rol",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "identifier",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "AspNetRoles",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AspNetRoles",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "City",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_City", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Latitude = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Venue",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    CityId = table.Column<string>(nullable: true),
                    LocationId = table.Column<string>(nullable: true),
                    EventId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Venue_City_CityId",
                        column: x => x.CityId,
                        principalTable: "City",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Venue_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Venue_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Venue_CityId",
                table: "Venue",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Venue_EventId",
                table: "Venue",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Venue_LocationId",
                table: "Venue",
                column: "LocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Venue");

            migrationBuilder.DropTable(
                name: "City");

            migrationBuilder.DropTable(
                name: "Location");

            migrationBuilder.DropColumn(
                name: "FechaNacimiento",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FechaRegistro",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LugarDeOrigen",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Rol",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "identifier",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AspNetRoles");

            migrationBuilder.AddColumn<string>(
                name: "Locale",
                table: "Events",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 256);
        }
    }
}
