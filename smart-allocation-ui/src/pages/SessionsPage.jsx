import { useEffect, useState } from "react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    // MOCK DATA (always works)
    setSessions([
      { id: "1", name: "React Training", time: "09:00", capacity: 3, allocated: 0 },
      { id: "2", name: "AI Workshop", time: "11:00", capacity: 2, allocated: 0 },
      { id: "3", name: "Cloud Basics", time: "14:00", capacity: 2, allocated: 0 }
    ]);

    setParticipants([
      { id: "p1", name: "John Smith", department: "IT" },
      { id: "p2", name: "Sarah Lee", department: "HR" },
      { id: "p3", name: "David Khan", department: "Finance" }
    ]);
  }, []);

  const handleAssign = (session) => {
    if (!selectedParticipant) {
      alert("Select a participant first");
      return;
    }

    const participant = participants.find(p => p.id === selectedParticipant);

    // Prevent full session
    if (session.allocated >= session.capacity) {
      alert("Session is full!");
      return;
    }

    // Prevent duplicate booking
    const alreadyBooked = allocations.find(a => a.participantId === participant.id);
    if (alreadyBooked) {
      alert(`${participant.name} is already booked!`);
      return;
    }

    // Create booking
    const newAllocation = {
      participantId: participant.id,
      participantName: participant.name,
      sessionId: session.id,
      sessionName: session.name,
      status: "CONFIRMED"
    };

    setAllocations([...allocations, newAllocation]);

    // Update session seats
    const updatedSessions = sessions.map(s =>
      s.id === session.id
        ? { ...s, allocated: s.allocated + 1 }
        : s
    );

    setSessions(updatedSessions);

    // Show confirmation
    setConfirmation({
      name: participant.name,
      session: session.name,
      time: session.time
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Training Sessions</h1>

      {/* Confirmation */}
      {confirmation && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-xl">
          <h2 className="text-lg font-semibold text-green-700">
            Booking Confirmed
          </h2>
          <p>
            {confirmation.name} booked into {confirmation.session}
          </p>
          <p className="text-sm text-gray-600">
            Time: {confirmation.time}
          </p>
        </div>
      )}

      {/* Participant Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Participant</label>

        <select
          value={selectedParticipant}
          onChange={(e) => setSelectedParticipant(e.target.value)}
          className="w-full p-3 border rounded-xl"
        >
          <option value="">-- Select Participant --</option>

          {participants.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.department})
            </option>
          ))}
        </select>
      </div>

      {/* Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map(session => {
          const available = session.capacity - session.allocated;

          return (
            <div
              key={session.id}
              className="bg-white rounded-2xl shadow-md p-5 border"
            >
              <h2 className="text-xl font-semibold">{session.name}</h2>
              <p className="text-gray-500">{session.time}</p>

              <p className="mt-3 text-sm">
                Seats: {session.allocated} / {session.capacity}
              </p>

              <p className="mt-1 text-sm">
                Available:{" "}
                <span className={available === 0 ? "text-red-500" : "text-green-600"}>
                  {available}
                </span>
              </p>

              <button
                onClick={() => handleAssign(session)}
                disabled={available === 0}
                className={`mt-4 w-full py-2 rounded-xl text-white ${
                  available === 0
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {available === 0 ? "Full" : "Book Session"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Booking List (VERY IMPORTANT FOR DEMO) */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Confirmed Bookings</h2>

        {allocations.length === 0 && (
          <p className="text-gray-500">No bookings yet</p>
        )}

        {allocations.map((a, i) => (
          <div key={i} className="p-3 border rounded mb-2">
            {a.participantName} → {a.sessionName} ({a.status})
          </div>
        ))}
      </div>
    </div>
  );
}