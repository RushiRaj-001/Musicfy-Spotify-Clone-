import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../App";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
        portal: "admin",
      });

      if (response.status === 200) {
        const userData = {
          email: response.data.email,
          role: response.data.role,
        };

        setToken(response.data.token);
        setUser(userData);

        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(userData));

        return { success: true };
      }

      return {
        success: false,
        message: response.data.message || "Login failed",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || "Login failed",
      };
    }
  };
  const isAuthenticated = !!token && !!user;

  const isAdmin = () => {
    return user?.role === "ADMIN";
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
