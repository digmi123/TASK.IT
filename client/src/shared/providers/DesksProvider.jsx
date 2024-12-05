import { useGetDesks } from "@/features/desks/hooks/useGetDesks";
import { createContext, useContext } from "react";

const DesksContext = createContext();

export default function DesksProvider({ children }) {
  const { desks, addDesk, newDeskStatus, loading } = useGetDesks();

  if (loading) return <div>Loading...</div>;

  return (
    <DesksContext.Provider value={{ desks, addDesk, newDeskStatus, loading }}>
      {children}
    </DesksContext.Provider>
  );
}
export const useDesks = () => {
  const desks = useContext(DesksContext);
  if (!desks) throw new Error("useDesks must be used within a DesksProvider");
  return desks;
};
