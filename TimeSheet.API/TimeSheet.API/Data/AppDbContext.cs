using Microsoft.EntityFrameworkCore;
using TimesheetApp.API.Models;


namespace TimesheetApp.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Timesheet> Timesheets { get; set; }
        public DbSet<TimesheetEntry> TimesheetEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Name = "Manager", Email = "manager@company.com", PasswordHash = "123", Role = "Manager" },
                new User { UserId = 2, Name = "Employee", Email = "employee@company.com", PasswordHash = "123", Role = "Employee" }
            );
        }
    }
}
