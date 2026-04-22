import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const snapshot = await getDocs(collection(db, "participants"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setParticipants(data);
    };

    fetchParticipants();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Participants</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {participants.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td>{p.department}</td>
                <td>
                  {p.assignedSession ? (
                    <span className="text-green-600 font-medium">
                      Assigned
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-medium">
                      Not Assigned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}