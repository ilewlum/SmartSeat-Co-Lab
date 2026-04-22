using Microsoft.AspNetCore.Mvc;
namespace SmartSeat.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AllocationController : ControllerBase
{
    private readonly IAllocationRepository _allocationRepo;
    private readonly IParticipantRepository _participantRepo;

    public AllocationController(IAllocationRepository repo, IParticipantRepository pRepo)
    {
        _allocationRepo = repo;
        _participantRepo = pRepo;
    }

    [HttpPost]
    public async Task<IActionResult> Assign([FromBody] AllocationRequest request)
    {
        // 1. Fetch Participant to know their Department
        var participant = await _participantRepo.GetByIdAsync(request.ParticipantId);

        // 2. RUN BUSINESS VALIDATIONS
        // Check Constraint #2: One session per participant
        var isAlreadyAssigned = await _allocationRepo.IsParticipantAssignedAsync(request.ParticipantId);
        if (isAlreadyAssigned) return BadRequest("Participant is already registered for a session.");

        // Check Constraint #3: Department Limits
        var deptCount = await _allocationRepo.GetDeptCountInSession(request.SessionId, participant.DepartmentId);
        if (!IsValidForDepartment(participant.Division, deptCount))
            return BadRequest("Department limit reached for this session.");

        // 3. IF VALID, SAVE
        await _allocationRepo.CreateAsync(request);
        return Ok("Allocation successful.");
    }

    private bool IsValidForDepartment(string division, int currentCount)
    {
        // Logic for Division A (8) vs B/C (6)
        return division == "Division A" ? currentCount < 8 : currentCount < 6;
    }
}