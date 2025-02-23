import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as authLogin } from "@expense/auth";
import { jwtDecode } from "jwt-decode";

type User = {
  userId: string;
  accessToken: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const initiallAuthContext: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
};

const AuthContext = createContext<AuthContextType>(initiallAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setInterval(() => {
        setLoading(false);
      }, 500);
    }
    loadUser();
  }, []);

  async function login(email: string, password: string) {
    const accessToken = await authLogin(email, password);
    const { userId, name } = jwtDecode(accessToken) as User;

    const userData: User = {
      accessToken,
      email,
      userId,
      name,
    };

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  async function logout() {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
