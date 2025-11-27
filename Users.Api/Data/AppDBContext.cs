using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.Api.Models;
using Microsoft.EntityFrameworkCore;


namespace Users.Api.Data
{
    public class AppDbContext : DbContext

    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<UserModel> Users { get; set; }

        public DbSet <AreaModel> AreaModels { get; set; }

         public DbSet<Machine> Machines { get; set; }

        public DbSet<AndonEventModel> AndonEvents { get; set; }
        public DbSet <Line> Lines { get; set; }

        public DbSet<WorkStation> WorkStations { get; set; }

        public DbSet<ProductionModel> Productions { get; set; }


      protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Configuración de User
    modelBuilder.Entity<UserModel>()
        .HasKey(u => u.IdUser);

    // Area - Line (1:N)
    modelBuilder.Entity<Line>()
        .HasOne(l => l.Area)
        .WithMany(a => a.Lines)
        .HasForeignKey(l => l.AreaId)
        .OnDelete(DeleteBehavior.Cascade);

    // Line - WorkStation (1:N)
    modelBuilder.Entity<WorkStation>()
        .HasOne(ws => ws.Line)
        .WithMany(l => l.WorkStations)
        .HasForeignKey(ws => ws.LineId)
        .OnDelete(DeleteBehavior.Cascade);

    // WorkStation - Machine (1:N)
    modelBuilder.Entity<Machine>()
        .HasOne(m => m.WorkStation)
        .WithMany(ws => ws.Machines)
        .HasForeignKey(m => m.WorkStationId)
        .OnDelete(DeleteBehavior.Cascade);

    // Production - User (N:1)
    modelBuilder.Entity<ProductionModel>()
        .HasOne(p => p.User)
        .WithMany() // si quieres luego puedes hacer ICollection<ProductionModel> en User
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.Restrict);

    // Production - Machine (N:1)
    modelBuilder.Entity<ProductionModel>()
        .HasOne(p => p.Machine)
        .WithMany() // si quieres luego ICollection<ProductionModel> en Machine
        .HasForeignKey(p => p.MachineId)
        .OnDelete(DeleteBehavior.Restrict);

    // Production - WorkStation (N:1)
    modelBuilder.Entity<ProductionModel>()
        .HasOne(p => p.WorkStation)
        .WithMany()
        .HasForeignKey(p => p.StationId)
        .OnDelete(DeleteBehavior.Restrict);

    // Production - Line (N:1)
    modelBuilder.Entity<ProductionModel>()
        .HasOne(p => p.Line)
        .WithMany()
        .HasForeignKey(p => p.LineId)
        .OnDelete(DeleteBehavior.Restrict);

    // Production - Area (N:1)
    modelBuilder.Entity<ProductionModel>()
        .HasOne(p => p.Area)
        .WithMany()
        .HasForeignKey(p => p.AreaId)
        .OnDelete(DeleteBehavior.Restrict);

    base.OnModelCreating(modelBuilder);
}
    }
}