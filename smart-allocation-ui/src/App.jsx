import { useState } from "react";
import SmartAllocationDashboard from "./pages/SmartAllocationDashboard";
import ParticipantsPage from "./pages/ParticipantsPage";
import SessionsPage from "./pages/SessionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "participants":
        return <ParticipantsPage />;
      case "sessions":
        return <SessionsPage />;
      case "analytics":
        return <AnalyticsPage />;
      default:
        return <SmartAllocationDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-xl font-semibold">Smart Allocation</h2>

        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("participants")}>Participants</button>
        <button onClick={() => setPage("sessions")}>Sessions</button>
        <button onClick={() => setPage("analytics")}>Analytics</button>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {renderPage()}
      </div>
    </div>
  );
}