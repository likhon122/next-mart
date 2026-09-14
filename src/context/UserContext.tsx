/* eslint-disable react-hooks/rules-of-hooks */
"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { getUserInfo } from "@/services/authService";
import { IUser, IUserProviderValues } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const userInfo = await getUserInfo();
    setUser(userInfo as IUser | null);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, isLoading, setIsLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
