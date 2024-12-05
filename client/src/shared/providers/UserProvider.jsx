import { useGetUser } from "@/features/users/hooks/useGetUser";
import { createContext, useContext } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const { userData, setUserData, loading } = useGetUser();

  if (loading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) throw new Error("useUser must be used within a UserProvider");
  return user;
};
