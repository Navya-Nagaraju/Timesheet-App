using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimesheetApp.API.Data;
using TimesheetApp.API.DTOs;
using TimesheetApp.API.Models;

namespace TimesheetApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL USERS
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        // GET USER BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // CREATE USER
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserRequest req)
        {
            if (await _context.Users.AnyAsync(u => u.Email == req.Email))
                return BadRequest("Email already exists.");

            var user = new User
            {
                Email = req.Email,
                PasswordHash = req.Password, // you can add hashing later
                Role = req.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        // UPDATE USER
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, CreateUserRequest req)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Prevent duplicate email
            if (await _context.Users.AnyAsync(u => u.Email == req.Email && u.UserId != id))
                return BadRequest("Email already exists.");

            user.Email = req.Email ?? user.Email;
            user.Role = req.Role ?? user.Role;

            if (!string.IsNullOrWhiteSpace(req.Password))
                user.PasswordHash = req.Password;

            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // DELETE USER
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
