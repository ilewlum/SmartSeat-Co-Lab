import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sessions"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
      <h2>Sessions</h2>

      {sessions.map(session => (
        <div key={session.id} style={{ marginBottom: "10px" }}>
          <h3>{session.name}</h3>
          <p>Time: {session.time}</p>
          <p>
            Seats: {session.allocated} / {session.capacity}
          </p>
          <p>
            Available: {session.capacity - session.allocated}
          </p>
        </div>
      ))}
    </div>
  );
}