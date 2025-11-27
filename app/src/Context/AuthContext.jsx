import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token && !user) {
      const payload = parseJwt(token);
      if (payload) {
        const inferredUser = {
          userName:
            payload["name"] ??
            payload["unique_name"] ??
            payload["userName"] ??
            "Desconocido",
          rol:
            payload[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] ??
            payload["role"] ??
            payload["rol"] ??
            "User",
          idUser:
            payload["id"] ?? payload["sub"] ?? payload["nameid"] ?? "N/A",
        };
        setUser(inferredUser);
        localStorage.setItem("user", JSON.stringify(inferredUser));
      }
    }
  }, [token]);

  const login = (newToken, newUser) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);

    if (newUser) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      const payload = parseJwt(newToken);
      if (payload) {
        const inferredUser = {
          userName:
            payload["name"] ??
            payload["unique_name"] ??
            payload["userName"] ??
            "Desconocido",
          rol:
            payload[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] ??
            payload["role"] ??
            payload["rol"] ??
            "User",
          idUser:
            payload["id"] ?? payload["sub"] ?? payload["nameid"] ?? "N/A",
        };
        setUser(inferredUser);
        localStorage.setItem("user", JSON.stringify(inferredUser));
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // redirige al login
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
