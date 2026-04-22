import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AnalyticsPage() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    console.log("Analytics page mounted");

    const unsub = onSnapshot(
      collection(db, "allocations"),
      (snap) => {
        const data = snap.docs.map((d) => d.data());
        console.log("Allocations:", data);
        setAllocations(data);
      },
      (error) => {
        console.error("Firestore error:", error);
      }
    );

    return () => unsub();
  }, []);

  const total = allocations.length;
  const capacity = 60;

  const completion = capacity
    ? ((total / capacity) * 100).toFixed(0)
    : 0;

  // SAFE department breakdown
  const deptStats = {
    A: allocations.filter((a) => a?.department === "A").length,
    B: allocations.filter((a) => a?.department === "B").length,
    C: allocations.filter((a) => a?.department === "C").length,
  };

  return (
    <div className="p-8">

      {/* DEBUG */}
      <div className="mb-4 text-green-600 font-semibold">
        Analytics Page Loaded
      </div>

      <h1 className="text-3xl font-semibold mb-6">
        Analytics Overview
      </h1>

      {/* METRICS */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 text-sm">Total Allocations</p>
          <h2 className="text-3xl font-semibold">{total}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 text-sm">Completion</p>
          <h2 className="text-3xl font-semibold">{completion}%</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 text-sm">Remaining</p>
          <h2 className="text-3xl font-semibold">
            {Math.max(capacity - total, 0)}
          </h2>
        </div>
      </div>

      {/* DEPARTMENTS */}
      <div className="bg-white rounded-2xl p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Department Distribution
        </h2>

        <div className="space-y-4">
          {["A", "B", "C"].map((dep) => {
            const value = deptStats[dep];
            const max = dep === "A" ? 24 : 18;
            const percent = max ? (value / max) * 100 : 0;

            return (
              <div key={dep}>
                <div className="flex justify-between text-sm mb-1">
                  <span>Division {dep}</span>
                  <span>{value}/{max}</span>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-black h-3 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STATUS */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">
          System Status
        </h2>

        <p className="text-gray-600">
          {total === capacity
            ? "All participants successfully allocated."
            : "System actively allocating participants."}
        </p>
      </div>
    </div>
  );
}