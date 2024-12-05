import { useEffect, useState } from "react";
import { getUserInfo } from "../api";

export function useGetUser() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserInfo();
      setLoading(false);
      setUserData(userData);
    };

    loadUserData();
  }, []);

  return { loading, userData, setUserData };
}
