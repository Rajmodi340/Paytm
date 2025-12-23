const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navbar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">PayTM App</h1>
            <span className="text-gray-600">
              Your balance: <span className="font-semibold">₹10,000</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">Hello</span>
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
              U
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="bg-white rounded-lg shadow p-6">

          {/* Users Heading */}
          <h2 className="text-lg font-semibold mb-4">Users</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search users..."
            className="w-full mb-6 px-4 py-2 border rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* User Card */}
          <div className="flex items-center justify-between border rounded-lg p-4 hover:shadow transition">

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500
                              text-white font-semibold flex items-center justify-center">
                K
              </div>

              <span className="font-medium text-gray-800">
                Karan Barman
              </span>
            </div>

            <button className="bg-green-500 text-white px-5 py-2 rounded-md
                               hover:bg-green-600 transition">
              Send Money
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
