namespace TimesheetApp.API.DTOs
{
    public class CreateTimesheetRequest
    {
        public int UserId { get; set; }
        public DateTime WeekStartDate { get; set; }
        public DateTime WeekEndDate { get; set; }

        public List<CreateTimesheetEntryRequest> Entries { get; set; }
    }
}
