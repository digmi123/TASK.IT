import { useParams } from "react-router-dom";
import reactLogo from "@/assets/react.svg";
import Desks from "@/features/desks/components/Desks";
import Divider from "@/shared/components/Divider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrganizationThunk } from "@/redux/slices/organizationSlice";
import MembersCircleList from "./MembersCircleList";

function Organization() {
  const { organizationId } = useParams();
  const dispatch = useDispatch();
  const { organization, loading } = useSelector((state) => state.organization);

  useEffect(() => {
    dispatch(fetchUserOrganizationThunk({ organizationId }));
  }, [dispatch, organizationId]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center gap-6">
        <img src={reactLogo} alt="logo" className="w-20 h-20" />
        <h2 className="font-medium text-xl">{organization.name}</h2>
      </div>
      <Divider />
      {organization.members.length > 0 && (
        <MembersCircleList organization={organization} />
      )}

      <Desks />
    </>
  );
}

export default Organization;
