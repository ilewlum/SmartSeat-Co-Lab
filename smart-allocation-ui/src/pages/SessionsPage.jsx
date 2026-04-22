import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "sessions"), snap => {
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    onSnapshot(collection(db, "allocations"), snap => {
      setAllocations(snap.docs.map(d => d.data()));
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sessions</h1>

      <div className="grid grid-cols-3 gap-4">
        {sessions.map(s => {
          const sessionAlloc = allocations.filter(a => a.sessionId === s.id);

          const deptCount = {
            A: sessionAlloc.filter(a => a.department === "A").length,
            B: sessionAlloc.filter(a => a.department === "B").length,
            C: sessionAlloc.filter(a => a.department === "C").length,
          };

          return (
            <div key={s.id} className="bg-white p-4 rounded shadow">
              <h2>{s.name}</h2>
              <p>{sessionAlloc.length}/20</p>

              <div className="mt-2 text-sm">
                <p>A: {deptCount.A}/8</p>
                <p>B: {deptCount.B}/6</p>
                <p>C: {deptCount.C}/6</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}