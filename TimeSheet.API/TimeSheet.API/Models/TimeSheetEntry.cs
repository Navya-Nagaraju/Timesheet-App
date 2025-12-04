using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TimesheetApp.API.Models;

[Table("TimesheetEntries")]
public class TimesheetEntry
{
    [Key]
    [Column("EntryId")]
    public int EntryId { get; set; }

    [Column("TimesheetId")]
    public int TimesheetId { get; set; }

    [Column("Date")]
    public DateTime Date { get; set; }

    [Column("Project")]
    public string Project { get; set; }

    [Column("TaskDescription")]
    public string TaskDescription { get; set; }

    [Column("HoursWorked")]
    public decimal HoursWorked { get; set; }

    public Timesheet Timesheet { get; set; }
}
