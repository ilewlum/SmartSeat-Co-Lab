import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    onSnapshot(collection(db, "participants"), snap => {
      setParticipants(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const filtered =
    filter === "ALL"
      ? participants
      : participants.filter(p => p.department === filter);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Participants</h1>

      <div className="mb-4 flex gap-2">
        {["ALL", "A", "B", "C"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 bg-black text-white rounded"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-3 rounded shadow flex justify-between">
            <span>{p.name}</span>
            <span>{p.department} • {p.assignedSession || "Unassigned"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}