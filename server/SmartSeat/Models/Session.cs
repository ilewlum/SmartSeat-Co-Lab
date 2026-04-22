namespace SmartSeat.Models;

public class Session
{
    public Guid SessionId {get; set;} = Guid.NewGuid();
    public string Name{get; set;} = string.Empty;
    public string TimeSlot {get; set;} = string.Empty;
    public int Capacity {get; set;} = -999;
    public List<Participant> Participants {get; set;} = new();
}