export const getBloodGroups = async (axios) => {
  const res = await axios.get("/blood-groups");
  return res.data;
};

export const getDistricts = async (axios) => {
  const res = await axios.get("/districts");
  return res.data;
};

export const getUpazilasByDistrict = async (axios, districtId) => {
  const res = await axios.get(`/upzillas/${districtId}`);
  return res.data;
};
