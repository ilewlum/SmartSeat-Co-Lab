using Google.Cloud.Firestore;
namespace SmartSeat.Models;

[FirestoreData]
public class Participant
{
    public string ParticipantId{ get; set;} = Guid.NewGuid().ToString();

    [FirestoreProperty]
    public string Name {get; set; } = string.Empty;

    [FirestoreProperty]
    public string Email {get; set;} = string.Empty;

    [FirestoreProperty]
    public string DepartmentId {get; set;} = string.Empty;
    
    [FirestoreProperty]
    public string SessionId{get; set;} = string.Empty;
}