using Google.Cloud.Firestore;
using SmartSeat.Repository;
namespace SmartSeat.Repositories;

public class ParticipantRepository: IParticipantRepository
{
    private readonly FirestoreDb firestoreDb;
    private const string Collection = "participants";

    public ParticipantRepository(FirestoreDb db)         // 👈 FirestoreDb injected
    {
        firestoreDb = db;
    }


}