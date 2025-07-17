using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Users.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AndonEvents",
                columns: table => new
                {
                    IdEvent = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMachine = table.Column<int>(type: "integer", nullable: false),
                    IdFailure = table.Column<int>(type: "integer", nullable: false),
                    IdUser = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AndonEvents", x => x.IdEvent);
                });

            migrationBuilder.CreateTable(
                name: "AreaModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AreaModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Rol = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IdUser);
                });

            migrationBuilder.CreateTable(
                name: "Lines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AreaId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    AreaId1 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lines_AreaModels_AreaId",
                        column: x => x.AreaId,
                        principalTable: "AreaModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lines_AreaModels_AreaId1",
                        column: x => x.AreaId1,
                        principalTable: "AreaModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProduccionModels",
                columns: table => new
                {
                    IdProduccion = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdArea = table.Column<int>(type: "integer", nullable: false),
                    IdLine = table.Column<int>(type: "integer", nullable: false),
                    IdStation = table.Column<int>(type: "integer", nullable: false),
                    IdMachine = table.Column<int>(type: "integer", nullable: false),
                    IdModel = table.Column<int>(type: "integer", nullable: false),
                    IdUser = table.Column<int>(type: "integer", nullable: false),
                    DateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    QuantityProducedOK = table.Column<int>(type: "integer", nullable: false),
                    QuantityProducedNG = table.Column<int>(type: "integer", nullable: false),
                    ProductionTime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    ProductionDowntime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    UserIdUser = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProduccionModels", x => x.IdProduccion);
                    table.ForeignKey(
                        name: "FK_ProduccionModels_Users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "Users",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkStations",
                columns: table => new
                {
                    IdWorkStation = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdLine = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    LineId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkStations", x => x.IdWorkStation);
                    table.ForeignKey(
                        name: "FK_WorkStations_Lines_IdLine",
                        column: x => x.IdLine,
                        principalTable: "Lines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkStations_Lines_LineId",
                        column: x => x.LineId,
                        principalTable: "Lines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    IdMachine = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdWorkStation = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    SerialNumber = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    WorkStationIdWorkStation = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.IdMachine);
                    table.ForeignKey(
                        name: "FK_Machines_WorkStations_IdWorkStation",
                        column: x => x.IdWorkStation,
                        principalTable: "WorkStations",
                        principalColumn: "IdWorkStation",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Machines_WorkStations_WorkStationIdWorkStation",
                        column: x => x.WorkStationIdWorkStation,
                        principalTable: "WorkStations",
                        principalColumn: "IdWorkStation",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lines_AreaId",
                table: "Lines",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Lines_AreaId1",
                table: "Lines",
                column: "AreaId1");

            migrationBuilder.CreateIndex(
                name: "IX_Machines_IdWorkStation",
                table: "Machines",
                column: "IdWorkStation");

            migrationBuilder.CreateIndex(
                name: "IX_Machines_WorkStationIdWorkStation",
                table: "Machines",
                column: "WorkStationIdWorkStation");

            migrationBuilder.CreateIndex(
                name: "IX_ProduccionModels_UserIdUser",
                table: "ProduccionModels",
                column: "UserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_WorkStations_IdLine",
                table: "WorkStations",
                column: "IdLine");

            migrationBuilder.CreateIndex(
                name: "IX_WorkStations_LineId",
                table: "WorkStations",
                column: "LineId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AndonEvents");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "ProduccionModels");

            migrationBuilder.DropTable(
                name: "WorkStations");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Lines");

            migrationBuilder.DropTable(
                name: "AreaModels");
        }
    }
}
