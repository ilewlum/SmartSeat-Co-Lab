import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const deptLimits = { A: 8, B: 6, C: 6 };

export default function SmartAllocationDashboard() {
  const [participants, setParticipants] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [allocations, setAllocations] = useState([]);

  // REAL-TIME DATA
  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "participants"), snap => {
      setParticipants(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsub2 = onSnapshot(collection(db, "sessions"), snap => {
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsub3 = onSnapshot(collection(db, "allocations"), snap => {
      setAllocations(snap.docs.map(d => d.data()));
    });

    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, []);

  const validate = (participant, session) => {
    if (participant.assignedSession) {
      return "Already assigned";
    }

    const sessionAlloc = allocations.filter(a => a.sessionId === session.id);

    if (sessionAlloc.length >= 20) {
      return "Session full";
    }

    const deptCount = sessionAlloc.filter(
      a => a.department === participant.department
    ).length;

    if (deptCount >= deptLimits[participant.department]) {
      return "Department limit reached";
    }

    return null;
  };

  const assign = async (participant, session) => {
    const error = validate(participant, session);
    if (error) {
      alert(error);
      return;
    }

    await addDoc(collection(db, "allocations"), {
      participantId: participant.id,
      sessionId: session.id,
      department: participant.department
    });

    await updateDoc(doc(db, "participants", participant.id), {
      assignedSession: session.id
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Smart Allocation
          </h1>
          <p className="text-gray-500 mt-1">
            Automated seat allocation with real-time validation
          </p>
        </div>
      </div>

      {/* Sessions */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {sessions.map(session => {
          const sessionAlloc = allocations.filter(
            a => a.sessionId === session.id
          );
          const remaining = 20 - sessionAlloc.length;

          return (
            <div
              key={session.id}
              className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold">{session.name}</h2>
              <p className="text-gray-500 text-sm">{session.time}</p>

              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Capacity</span>
                  <span>{sessionAlloc.length}/20</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className="bg-black h-2 rounded-full"
                    style={{
                      width: `${(sessionAlloc.length / 20) * 100}%`
                    }}
                  />
                </div>

                <p
                  className={`mt-2 text-sm ${
                    remaining === 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {remaining} seats remaining
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Participants */}
      <div className="space-y-3">
        {participants.map(p => (
          <div
            key={p.id}
            className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">
                Dept {p.department} •{" "}
                {p.assignedSession || "Unassigned"}
              </p>
            </div>

            <div className="flex gap-2">
              {sessions.map(s => (
                <button
                  key={s.id}
                  onClick={() => assign(p, s)}
                  className="px-3 py-1 text-sm rounded-lg bg-black text-white hover:opacity-80"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}