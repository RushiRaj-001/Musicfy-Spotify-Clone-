import { useState } from "react";
import { useAuth } from "../context/authContext";
import Register from "./Register";
import Login from "./Login";

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full border-4 border-green-500 animate-ping"></div>
          <div className="absolute w-24 h-24 rounded-full border-4 border-green-400 animate-pulse blur-sm"></div>
          <div className="absolute w-16 h-16 rounded-full border-4 border-green-300 animate-spin-slow"></div>
          <div className="absolute w-4 h-4 bg-green-500 rounded-full shadow-[0_0_20px_#22c55e]"></div>
        </div>
        <p className="text-green-400 text-lg mt-6 tracking-wide animate-pulse">
          Syncing your beats...
        </p>

        <style>
          {`
          .animate-spin-slow {
            animation: spin 4s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
        </style>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }
  return children;
};

export default AuthWrapper;
