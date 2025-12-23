const SendMoney = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Send Money
        </h2>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-500
                          flex items-center justify-center
                          text-white font-semibold">
            H
          </div>
          <span className="text-lg font-medium">
            Friend's Name
          </span>
        </div>

        {/* Amount */}
        <label className="block text-sm text-gray-600 mb-2">
          Amount (in Rs)
        </label>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full mb-6 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     hover:border-green-500 transition"
        />

        {/* Button */}
        <button className="w-full bg-green-500 text-white py-3 rounded-lg
                           font-semibold hover:bg-green-600 transition">
          Initiate Transfer
        </button>

      </div>

    </div>
  );
};

export default SendMoney;
