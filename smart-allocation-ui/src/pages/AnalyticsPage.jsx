import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AnalyticsPage() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "allocations"), snap => {
      setAllocations(snap.docs.map(d => d.data()));
    });
  }, []);

  const total = allocations.length;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded shadow">
          <h3>Total Allocations</h3>
          <p className="text-2xl">{total}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Completion</h3>
          <p className="text-2xl">{(total / 60) * 100}%</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Remaining</h3>
          <p className="text-2xl">{60 - total}</p>
        </div>
      </div>
    </div>
  );
}