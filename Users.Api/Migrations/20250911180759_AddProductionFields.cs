using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Users.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProductionFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModelId",
                table: "Productions");

            migrationBuilder.AddColumn<string>(
                name: "Failure",
                table: "Productions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Productions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Operator",
                table: "Productions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Productions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Failure",
                table: "Productions");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Productions");

            migrationBuilder.DropColumn(
                name: "Operator",
                table: "Productions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Productions");

            migrationBuilder.AddColumn<int>(
                name: "ModelId",
                table: "Productions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
