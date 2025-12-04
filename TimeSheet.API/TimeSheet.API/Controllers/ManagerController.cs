using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimesheetApp.API.Data;
using TimesheetApp.API.DTOs;
using TimesheetApp.API.Models;

namespace TimesheetApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ManagerController(AppDbContext context)
        {
            _context = context;
        }

        // All submitted timesheets
        [HttpGet("submitted")]
        public async Task<IActionResult> GetSubmitted()
        {
            var sheets = await _context.Timesheets
                .Include(t => t.User)
                .Include(t => t.Entries)
                .Where(t => t.Status == "Submitted")
                .ToListAsync();

            return Ok(sheets);
        }

        // Approve
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id, [FromBody] ManagerDecisionRequest req)
        {
            var sheet = await _context.Timesheets.FindAsync(id);
            if (sheet == null) return NotFound("Not found");

            if (sheet.Status != "Submitted")
                return BadRequest("Only Submitted timesheets can be approved");

            sheet.Status = "Approved";
            sheet.ManagerComments = req.ManagerComments ?? "Approved";

            await _context.SaveChangesAsync();
            return Ok(new { message = "Timesheet approved", sheet });
        }

        // Reject
        [HttpPut("reject/{id}")]
        public async Task<IActionResult> Reject(int id, [FromBody] ManagerDecisionRequest req)
        {
            var sheet = await _context.Timesheets.FindAsync(id);
            if (sheet == null) return NotFound("Not found");

            if (sheet.Status != "Submitted")
                return BadRequest("Only Submitted timesheets can be rejected");

            sheet.Status = "Rejected";
            sheet.ManagerComments = req.ManagerComments ?? "Rejected";

            await _context.SaveChangesAsync();
            return Ok(new { message = "Timesheet rejected", sheet });
        }
    }
}
