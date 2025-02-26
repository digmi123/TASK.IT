import axios from "axios";

export const getDeskMembers = async (deskId) => {
  const members = await axios.get(`/api/desks/${deskId}/members`);
  return members.data;
};

export const getOrganizationMembers = async (organizationId) => {
  const members = await axios.get(
    `/api/organizations/${organizationId}/members`
  );
  return members.data;
};
