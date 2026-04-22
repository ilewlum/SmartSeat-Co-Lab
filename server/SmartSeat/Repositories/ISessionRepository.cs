// ISessionRepository.cs
using SmartSeat.Models;
namespace SmartSeat.Repositories;

public interface ISessionRepository
{
    Task<Session> GetSessionByIdAsync(string sessionId);
    Task<IEnumerable<Session>> GetAllSessionsAsync();
    Task<IEnumerable<Session>> GetSessionsByDepartmentAsync(string departmentId);
    Task<IEnumerable<Session>> GetSessionsByParticipantAsync(string participantId);

    Task<Session> CreateAsync(Session session);
    Task<Session> UpdateAsync(string sessionId, Session session);
    Task<bool> DeleteAsync(string sessionId);  
}