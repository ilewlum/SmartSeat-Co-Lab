using Google.Cloud.Firestore;
using SmartSeat.Models;
using SmartSeat.Repositories;

namespace SmartSeat.Repositories;

public class SessionRepository : ISessionRepository
{
    private readonly FirestoreDb _firestoreDb;
    private const string Collection = "sessions";

    public SessionRepository(FirestoreDb db)
    {
        _firestoreDb = db;
    }

    public async Task<Session> GetSessionByIdAsync(string sessionId)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(sessionId);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
            throw new KeyNotFoundException($"Session '{sessionId}' not found.");

        return snapshot.ConvertTo<Session>();
    }

    public async Task<IEnumerable<Session>> GetAllSessionsAsync()
    {
        QuerySnapshot snapshot = await _firestoreDb
            .Collection(Collection)
            .GetSnapshotAsync();

        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<Session>());
    }

    public async Task<IEnumerable<Session>> GetSessionsByDepartmentAsync(string departmentId)
    {
        QuerySnapshot snapshot = await _firestoreDb
            .Collection(Collection)
            .WhereEqualTo("DepartmentId", departmentId)
            .GetSnapshotAsync();

        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<Session>());
    }

    public async Task<IEnumerable<Session>> GetSessionsByParticipantAsync(string participantId)
    {
        QuerySnapshot snapshot = await _firestoreDb
            .Collection(Collection)
            .WhereEqualTo("ParticipantId", participantId)
            .GetSnapshotAsync();

        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<Session>());
    }

    public async Task<Session> CreateAsync(Session session)
    {
        if (string.IsNullOrEmpty(session.SessionId))
            session.SessionId = Guid.NewGuid().ToString();

        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(session.SessionId);

        await docRef.SetAsync(session);

        return session;
    }

    public async Task<Session> UpdateAsync(string sessionId, Session session)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(sessionId);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
            throw new KeyNotFoundException($"Session '{sessionId}' not found.");

        session.SessionId = sessionId;
        await docRef.SetAsync(session, SetOptions.Overwrite);

        return session;
    }

    public async Task<bool> DeleteAsync(string sessionId)
    {
        DocumentReference docRef = _firestoreDb
            .Collection(Collection)
            .Document(sessionId);

        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
            return false;

        await docRef.DeleteAsync();
        return true;
    }
}