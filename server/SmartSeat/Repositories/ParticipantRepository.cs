using Google.Cloud.Firestore;
using SmartSeat.Models;
using SmartSeat.Repository;
 
namespace SmartSeat.Repositories;
 
public class ParticipantRepository : IParticipantRepository
{
    private readonly FirestoreDb _firestoreDb;
    private const string Collection = "participants";
 
    public ParticipantRepository(FirestoreDb db)
    {
        _firestoreDb = db;
    }
 
    public async Task<Participant> GetParticipantByIdAsync(string participantId)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(participantId);
 
        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
 
        if (!snapshot.Exists)
            throw new KeyNotFoundException($"Participant '{participantId}' not found.");
 
        return snapshot.ConvertTo<Participant>();
    }
 
    public async Task<IEnumerable<Participant>> GetAllParticipantsAsync()
    {
        QuerySnapshot snapshot = await _firestoreDb
            .Collection(Collection)
            .GetSnapshotAsync();
 
        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<Participant>());
    }
 
    public async Task<Participant> GetParticipantBySessionAsync(string sessionId)
    {
        QuerySnapshot snapshot = await _firestoreDb
            .Collection(Collection)
            .WhereEqualTo("SessionId", sessionId)
            .Limit(1)
            .GetSnapshotAsync();
 
        DocumentSnapshot? doc = snapshot.Documents.FirstOrDefault(d => d.Exists);
 
        if (doc is null)
            throw new KeyNotFoundException($"No participant found for session '{sessionId}'.");
 
        return doc.ConvertTo<Participant>();
    }
 
    public async Task<Participant> GetParticipantByDepartmentAsync(string departmentId)
    {
        QuerySnapshot snapshot = await _firestoreDb
            .Collection(Collection)
            .WhereEqualTo("DepartmentId", departmentId)
            .Limit(1)
            .GetSnapshotAsync();
 
        DocumentSnapshot? doc = snapshot.Documents.FirstOrDefault(d => d.Exists);
 
        if (doc is null)
            throw new KeyNotFoundException($"No participant found for department '{departmentId}'.");
 
        return doc.ConvertTo<Participant>();
    }
 
    public async Task<Participant> CreateAsync(Participant participant)
    {
        if (string.IsNullOrEmpty(participant.ParticipantId))
            participant.ParticipantId = Guid.NewGuid().ToString();
 
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(participant.ParticipantId);
 
        await docRef.SetAsync(participant);
 
        return participant;
    }
 
    public async Task<Participant> UpdateAsync(string id, Participant participant)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(id);
 
        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
 
        if (!snapshot.Exists)
            throw new KeyNotFoundException($"Participant '{id}' not found.");
 
        participant.ParticipantId = id;
        await docRef.SetAsync(participant, SetOptions.Overwrite);
 
        return participant;
    }
 
    public async Task<bool> DeleteAsync(string participantId)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(participantId);
 
        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
 
        if (!snapshot.Exists)
            return false;
 
        await docRef.DeleteAsync();
        return true;
    }
}