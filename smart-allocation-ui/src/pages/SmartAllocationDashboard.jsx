export default function SmartAllocationDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Smart Allocation Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Participants</h2>
          <p className="text-2xl font-bold mt-2">60</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Sessions</h2>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Available Seats</h2>
          <p className="text-2xl font-bold mt-2">60</p>
        </div>

      </div>
    </div>
  );
}