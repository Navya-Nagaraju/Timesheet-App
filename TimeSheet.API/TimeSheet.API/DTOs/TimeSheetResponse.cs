namespace TimeSheet.API.DTOs
{
    public class TimesheetResponse
    {
        public int TimesheetId { get; set; }
        public int UserId { get; set; }
        public DateTime WeekStartDate { get; set; }
        public DateTime WeekEndDate { get; set; }
        public string Status { get; set; } = "Draft";
        public DateTime? SubmittedOn { get; set; }

        public List<TimesheetEntryResponse> Entries { get; set; } = new();
    }

    public class TimesheetEntryResponse
    {
        public int EntryId { get; set; }
        public DateTime Date { get; set; }
        public string Project { get; set; } = string.Empty;
        public string TaskDescription { get; set; } = string.Empty;
        public decimal HoursWorked { get; set; }
    }

}
