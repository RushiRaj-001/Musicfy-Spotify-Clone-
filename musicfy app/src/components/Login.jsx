import { assets } from "../assets/assets";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setError("");

    // Login logic here

    if (!email || !password) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        // console.log(result.message);
        toast.error(result.message);
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center mb-6">
              <img src={assets.logo} alt="logo" className="w-16 h-16" />
              <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Sign in to Continue listening</p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border shadow-2xl border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div
                className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg text-sm mb-4"
                role="alert"
              > 
                {error}
              </div>
            )}
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              {/* Password Field */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                autoComplete="new-password"
                className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50
              disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Switch to register */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't Have account ?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer"
              >
                Sign up here
              </button>
            </p>
          </div>

          {/*Terms and Condition */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              By signing up, you agree to Musify's Terms and Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
