export default function Layout({ children, setPage }) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-semibold mb-6">Smart Allocation</h2>

        <nav className="space-y-3">
          <button onClick={() => setPage("dashboard")} className="block w-full text-left">Dashboard</button>
          <button onClick={() => setPage("participants")} className="block w-full text-left">Participants</button>
          <button onClick={() => setPage("sessions")} className="block w-full text-left">Sessions</button>
          <button onClick={() => setPage("analytics")} className="block w-full text-left">Analytics</button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}