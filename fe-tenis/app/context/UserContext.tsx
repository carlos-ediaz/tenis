import { createContext, useEffect, useState } from 'react';

interface User {
  email: string;
  type: string;
}

interface ContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<ContextType>({ user: null, setUser: () => {} });

interface UserProviderProps {
  children: React.ReactNode;
  overrides?: User;
}

export function UserProvider({ children, overrides }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(overrides || null);

  // Mounted
  useEffect(() => {
    const json = localStorage.getItem('user');
    if (json) {
      try {
        const data = JSON.parse(json);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  // Updated
  useEffect(() => {
    if (user === null) {
      localStorage.removeItem('user');
    }
    if (user !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;