using SmartSeat.Models;
namespace SmartSeat.Repositories;

public interface ISessiontRepository
{
    Task<Session>  GetSessionByIdAsync( Guid sessionId);
    Task<IEnumerable<Session>> GetSessionsByDepartmentAsync(Guid departmentId);
    Task<IEnumerable<Session>> GetAllSessionsAsync();
    Task<IEnumerable<Session>> GetSessionsByParticipantAsync(Guid participantId);
    
    Task<Participant> CreateAsync(Participant participant);
    Task<Participant> UpdateAsync(Guid id, Participant participant);
    Task<bool> DeleteAsync(Guid participantId);
}