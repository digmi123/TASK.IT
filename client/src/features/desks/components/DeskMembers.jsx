import { useDeskMembers } from "@/features/members/hooks/useDeskMembers";
import Members from "@/features/screens/Members";

function DeskMembers() {
  const { members, loading } = useDeskMembers();
  return <Members members={members} loading={loading} />;
}

export default DeskMembers;
