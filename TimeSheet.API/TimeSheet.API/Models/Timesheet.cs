using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TimesheetApp.API.Models;

[Table("Timesheets")]
public class Timesheet
{
    [Key]
    [Column("TimesheetId")]
    public int TimesheetId { get; set; }

    [Column("UserId")]
    public int UserId { get; set; }
    public User User { get; set; }

    [Column("WeekStartDate")]
    public DateTime WeekStartDate { get; set; }

    [Column("WeekEndDate")]
    public DateTime WeekEndDate { get; set; }

    [Column("TotalHours")]
    public decimal TotalHours { get; set; }

    [Column("Status")]
    public string Status { get; set; } = "Draft";

    [Column("ManagerComments")]
    public string? ManagerComments { get; set; }

    [Column("SubmittedOn")]
    public DateTime? SubmittedOn { get; set; }

    public List<TimesheetEntry> Entries { get; set; }
}
