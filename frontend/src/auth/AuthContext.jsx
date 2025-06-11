import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    try {
        const stored = localStorage.getItem("user");
        return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
    });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Set or remove auth header on token change
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

const login = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  console.log("Login response:", res.data);

  const decoded = jwtDecode(res.data.token);

  const user = {
    username: res.data.username, // ✅ direct from response
    id: decoded.id,              // from token payload
  };

  setUser(user);
  setToken(res.data.token);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(user));
};


    const signup = async (data) => {
    const res = await axios.post("/auth/signup", data);
    const decoded = jwtDecode(res.data.token);
    setUser({ username: res.data.username, id: decoded.id });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify({ username: res.data.username, id: decoded.id }));
    };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
