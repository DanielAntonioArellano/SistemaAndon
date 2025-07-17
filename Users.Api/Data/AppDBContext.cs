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
        public DbSet <ProduccionModel> ProduccionModels { get; set; }

        public DbSet <AreaModel> AreaModels { get; set; }

         public DbSet<Machine> Machines { get; set; }

        public DbSet<AndonEventModel> AndonEvents { get; set; }
        public DbSet <Line> Lines { get; set; }

        public DbSet<WorkStation> WorkStations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuring the primary key for UserModel
            modelBuilder.Entity<UserModel>()
                .HasKey(u => u.IdUser);

            base.OnModelCreating(modelBuilder);
                
               // Area - Line (1-N)
            modelBuilder.Entity<Line>()
                .HasOne<AreaModel>()
                .WithMany(a => a.Lines)
                .HasForeignKey(l => l.AreaId)
                .OnDelete(DeleteBehavior.Cascade);

            // Line - WorkStation (1-N)
            modelBuilder.Entity<WorkStation>()
                .HasOne<Line>()
                .WithMany(l => l.WorkStations)
                .HasForeignKey(ws => ws.IdLine)
                .OnDelete(DeleteBehavior.Cascade);

            // WorkStation - Machine (1-N)
            modelBuilder.Entity<Machine>()
                .HasOne<WorkStation>()
                .WithMany(ws => ws.Machines)
                .HasForeignKey(m => m.IdWorkStation)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
        
    }
}