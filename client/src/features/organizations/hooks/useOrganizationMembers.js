import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrganizationMembers } from "@/features/members/api";

export function useOrganizationMembers() {
  const { organizationId } = useParams();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      const deskMembers = await getOrganizationMembers(organizationId);
      setLoading(false);
      setMembers(deskMembers);
    };

    loadMembers();
  }, [organizationId]);

  return { loading, members, setMembers };
}
