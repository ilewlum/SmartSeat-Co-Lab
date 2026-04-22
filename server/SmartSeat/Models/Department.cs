using Google.Cloud.Firestore;
namespace SmartSeat.Models;

[FirestoreData]
public class Department
{
    public string DepartmentId {get; set;} = Guid.NewGuid().ToString();

    [FirestoreProperty]
    public string Name {get; set;} = string.Empty;

    [FirestoreProperty]
    public int TotalParticipant {get; set;} = -999;

    [FirestoreProperty]
    public int MaxPerSession {get; set;} = -999;
}