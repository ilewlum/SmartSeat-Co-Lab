import { Home, Users, Calendar, BarChart } from "lucide-react";
import { useState } from "react";

export default function Layout({ children, setPage }) {
  const [active, setActive] = useState("dashboard");

  const handleNav = (page) => {
    setActive(page);
    setPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm flex flex-col px-6 py-8">
        
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
            SmartSeat
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Allocation System
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">

          <NavButton
            icon={<Home size={18} />}
            label="Dashboard"
            active={active === "dashboard"}
            onClick={() => handleNav("dashboard")}
          />

          <NavButton
            icon={<Users size={18} />}
            label="Participants"
            active={active === "participants"}
            onClick={() => handleNav("participants")}
          />

          <NavButton
            icon={<Calendar size={18} />}
            label="Sessions"
            active={active === "sessions"}
            onClick={() => handleNav("sessions")}
          />

          <NavButton
            icon={<BarChart size={18} />}
            label="Analytics"
            active={active === "analytics"}
            onClick={() => handleNav("analytics")}
          />

        </nav>

        {/* Footer */}
        <div className="mt-auto pt-10 text-xs text-gray-400">
          © 2026 SmartSeat
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Smart Allocation System
          </h2>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            + New Allocation
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

/* Nav Button Component */
function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-4 py-3 rounded-xl
        transition-all duration-200
        ${
          active
            ? "bg-blue-100 text-blue-600 font-semibold"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >
      <span className="transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>
      {label}
    </button>
  );
}