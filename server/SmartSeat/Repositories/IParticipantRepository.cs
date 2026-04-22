using SmartSeat.Models;
 
namespace SmartSeat.Repository;
 
public interface IParticipantRepository
{
    Task<Participant> GetParticipantByIdAsync(string participantId);
    Task<IEnumerable<Participant>> GetAllParticipantsAsync();
    Task<Participant> GetParticipantBySessionAsync(string sessionId);
    Task<Participant> GetParticipantByDepartmentAsync(string departmentId);
    Task<Participant> CreateAsync(Participant participant);
    Task<Participant> UpdateAsync(string id, Participant participant);
    Task<bool> DeleteAsync(string participantId);
}