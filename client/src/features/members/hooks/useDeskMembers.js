import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeskMembers } from "../api";

export function useDeskMembers() {
  const { deskId } = useParams();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      const deskMembers = await getDeskMembers(deskId);
      setLoading(false);
      setMembers(deskMembers);
    };

    loadMembers();
  }, [deskId]);

  return { loading, members, setMembers };
}
