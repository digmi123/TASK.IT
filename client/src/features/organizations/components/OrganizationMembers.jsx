import Members from "@/features/screens/Members";
import { useOrganizationMembers } from "../hooks/useOrganizationMembers";

function OrganizationMembers() {
  const { members, loading } = useOrganizationMembers();
  return <Members members={members} loading={loading} />;
}

export default OrganizationMembers;
