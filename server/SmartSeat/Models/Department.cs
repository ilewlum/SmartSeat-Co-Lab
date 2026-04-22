namespace SmartSeat.Models;

public class Department
{
    public Guid DepartmentId {get; set;} = Guid.NewGuid();
    public string Name {get; set;} = string.Empty;
    public int TotalParticipant {get; set;} = -999;
    public int MaxPerSession {get; set;} = -999;
}