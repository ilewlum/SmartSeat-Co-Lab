import { useState } from "react";
import Layout from "./components/Layout";
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
    <Layout setPage={setPage}>
      {renderPage()}
    </Layout>
  );
}