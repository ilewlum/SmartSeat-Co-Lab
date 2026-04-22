import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const snapshot = await getDocs(collection(db, "sessions"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSessions(data);
    };

    fetchSessions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Training Sessions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map(session => {
          const available = session.capacity - session.allocated;

          return (
            <div
              key={session.id}
              className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{session.name}</h2>
              <p className="text-gray-500">{session.time}</p>

              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Seats: {session.allocated} / {session.capacity}
                </p>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{
                      width: `${(session.allocated / session.capacity) * 100}%`
                    }}
                  />
                </div>

                <p className="mt-2 text-sm font-medium">
                  Available:{" "}
                  <span
                    className={
                      available === 0 ? "text-red-500" : "text-green-600"
                    }
                  >
                    {available}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}