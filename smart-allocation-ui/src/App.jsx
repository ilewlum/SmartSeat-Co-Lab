import { useState } from "react";
import SmartAllocationDashboard from "./pages/SmartAllocationDashboard";
import ParticipantsPage from "./pages/ParticipantsPage";
import SessionsPage from "./pages/SessionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    try {
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
    } catch (error) {
      console.error("Page render error:", error);
      return (
        <div className="text-red-600">
          Error loading page. Check console.
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-xl font-semibold">Smart Allocation</h2>

        <button
          onClick={() => setPage("dashboard")}
          className="block w-full text-left hover:bg-gray-100 p-2 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={() => setPage("participants")}
          className="block w-full text-left hover:bg-gray-100 p-2 rounded"
        >
          Participants
        </button>

        <button
          onClick={() => setPage("sessions")}
          className="block w-full text-left hover:bg-gray-100 p-2 rounded"
        >
          Sessions
        </button>

        <button
          onClick={() => {
            console.log("Switching to Analytics");
            setPage("analytics");
          }}
          className="block w-full text-left hover:bg-gray-100 p-2 rounded"
        >
          Analytics
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 bg-gray-50">
        
        {/* Debug Info */}
        <div className="mb-4 text-sm text-gray-500">
          Current Page: <strong>{page}</strong>
        </div>

        {renderPage()}

      </div>
    </div>
  );
}