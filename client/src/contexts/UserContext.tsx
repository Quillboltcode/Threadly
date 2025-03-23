import { createContext, ReactNode, useContext, useState } from "react";

interface User{
    username: string,
    email: string,
    token: string
    avaratar: string
}

interface AuthContextType {
    user: User | null;
    login: (UserData: User) => void;
    logout: () => void;
}


// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};


// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const login = (userData: User) => {
      setUser(userData);
    };
  
    const logout = () => {
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };