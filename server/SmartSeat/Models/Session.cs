using Google.Cloud.Firestore;
namespace SmartSeat.Models;

[FirestoreData]
public class Session
{
    public string SessionId {get; set;} = Guid.NewGuid().ToString();

    [FirestoreProperty]
    public string Name{get; set;} = string.Empty;

    [FirestoreProperty]
    public string TimeSlot {get; set;} = string.Empty;

    [FirestoreProperty]
    public int Capacity {get; set;} = -999;

    [FirestoreProperty]
    public List<Participant> Participants {get; set;} = new();
}