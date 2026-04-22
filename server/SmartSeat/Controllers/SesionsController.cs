using Microsoft.AspNetCore.Mvc;
using SmartSeat.Models;
using SmartSeat.Repository;
namespace SmartSeat.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SessionsController : ControllerBase
{
	private readonly ISessionRepository _sessionRepo;

	public SessionsController(ISessionRepository sessionRepo) => _sessionRepo = sessionRepo;

	[HttpGet("{id}/availability")]
	public async Task<IActionResult> GetSessionAvailability(Guid id)
	{
		var session = await _sessionRepo.GetByIdAsync(id);
		if (session == null) return NotFound();

		// System Behavior Rule #4: Show remaining seats
		var remaining = 20 - session.CurrentParticipants.Count;
		return Ok(new { TotalCapacity = 20, RemainingSeats = remaining });
	}
}