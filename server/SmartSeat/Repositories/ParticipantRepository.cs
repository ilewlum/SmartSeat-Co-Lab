using SmartSeat.Models;

namespace SmartSeat.Repository;

public interface IParticipantRepository
{
    Task<Participant>  GetParticipantByIdAsync( Guid participantId);
    Task<IEnumerable<Participant>> GetAllParticipantsAsync();
    Task<Participant> GetParticipantBySessionAsync();
    Task<Participant> GetParticipantByDepartmentAsync();
    Task<Participant> CreateAsync(Participant participant);
    Task<Participant> UpdateAsync(Guid id, Participant participant);
    Task<bool> DeleteAsync(Guid participantId);
}