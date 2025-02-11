import axios from "axios";

export const getOrganization = async ({ organizationId }) => {
  const organization = await axios.get(`/api/organizations/${organizationId}`);
  return organization.data;
};
