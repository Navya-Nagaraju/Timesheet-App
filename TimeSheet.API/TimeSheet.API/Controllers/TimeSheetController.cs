using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimesheetApp.API.Data;
using TimesheetApp.API.DTOs;
using TimesheetApp.API.Models;

namespace TimesheetApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeSheetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TimeSheetController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/timesheet/user/5
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTimesheets(int userId)
        {
            var sheets = await _context.Timesheets
                .Where(t => t.UserId == userId)
                .Include(t => t.Entries)
                .ToListAsync();

            return Ok(sheets);
        }

        // POST: api/timesheet
        [HttpPost]
        public async Task<IActionResult> CreateTimesheet([FromBody] CreateTimesheetRequest request)
        {
            var sheet = new Timesheet
            {
                UserId = request.UserId,
                WeekStartDate = request.WeekStartDate,
                WeekEndDate = request.WeekEndDate,
                Status = "Draft",

                TotalHours = request.Entries.Sum(e => e.HoursWorked),

                Entries = request.Entries.Select(e => new TimesheetEntry
                {
                    Date = e.Date,
                    Project = e.Project,
                    TaskDescription = e.TaskDescription,
                    HoursWorked = e.HoursWorked
                }).ToList()
            };

            _context.Timesheets.Add(sheet);
            await _context.SaveChangesAsync();

            return Ok(sheet);
        }

        // PUT: api/timesheet/submit/5
        [HttpPut("submit/{id}")]
        public async Task<IActionResult> SubmitTimesheet(int id)
        {
            var sheet = await _context.Timesheets.FindAsync(id);
            if (sheet == null)
                return NotFound("Timesheet not found");

            if (sheet.Status != "Draft")
                return BadRequest("Only draft timesheets can be submitted.");

            sheet.Status = "Submitted";
            sheet.SubmittedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Timesheet submitted.", sheet });
        }
    }
}
