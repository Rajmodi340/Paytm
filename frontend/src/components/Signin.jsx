const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg
                      border border-transparent hover:border-indigo-500
                      transition-all duration-300">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Welcome back
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     hover:border-indigo-500 transition"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     hover:border-indigo-500 transition"
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg
                           font-semibold hover:bg-indigo-700 transition">
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signin;
