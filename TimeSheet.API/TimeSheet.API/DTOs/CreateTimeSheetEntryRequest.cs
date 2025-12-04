namespace TimesheetApp.API.DTOs
{
    public class CreateTimesheetEntryRequest
    {
        public DateTime Date { get; set; }
        public string Project { get; set; }
        public string TaskDescription { get; set; }
        public decimal HoursWorked { get; set; }
    }
}
