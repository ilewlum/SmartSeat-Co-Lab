import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "participants"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setParticipants(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div>
      <h2>Participants</h2>

      {participants.map(p => (
        <div key={p.id}>
          <p>
            {p.name} | Dept: {p.department} | Assigned:{" "}
            {p.assignedSession || "None"}
          </p>
        </div>
      ))}
    </div>
  );
}