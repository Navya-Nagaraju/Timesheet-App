using System.ComponentModel.DataAnnotations.Schema;

namespace TimesheetApp.API.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public string Role { get; set; }  // Manager / Employee

        public List<Timesheet> Timesheets { get; set; }
    }
}
