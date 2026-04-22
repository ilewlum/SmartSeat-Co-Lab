import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const seedParticipants = async () => {
  const participants = [];

  // Division A
  for (let i = 1; i <= 24; i++) {
    participants.push({
      name: `A${i}`,
      department: "A",
      assignedSession: null
    });
  }

  // Division B
  for (let i = 1; i <= 18; i++) {
    participants.push({
      name: `B${i}`,
      department: "B",
      assignedSession: null
    });
  }

  // Division C
  for (let i = 1; i <= 18; i++) {
    participants.push({
      name: `C${i}`,
      department: "C",
      assignedSession: null
    });
  }

  for (const p of participants) {
    await addDoc(collection(db, "participants"), p);
  }

  console.log("Participants seeded!");
};

export default seedParticipants;