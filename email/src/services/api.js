import axios from "axios";

const API = axios.create({
  baseURL: "https://email-marketing-mwp9.onrender.com/api",
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =  `Bearer ${token}`;
  }

  return config;
});

// ==================== AUTH ====================

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => API.post("/auth/login", data);

// ==================== DASHBOARD ====================

export const getDashboardStats = () => API.get("/dashboard");
// ================= CONTACTS =================

export const getContacts = () =>
  API.get("/contact/all");

export const createContact = (data) =>
  API.post("/contact/create", data);

export const updateContact = (id, data) =>
  API.put(`/contact/update/${id}`, data);

export const deleteContact = (id) =>
  API.delete(`/contact/update/${id}`);

export const importContacts = (formData) =>
  API.post("/contact/import", formData);

// ==================== AUDIENCE ====================
// ==================== AUDIENCE ====================

export const createAudience = (data) =>
  API.post("/audience/create", data);

export const updateAudience = (id,data) =>
  API.post("/audience/create", data);


export const getAudiences = () =>
  API.get("/audience/all");

export const deleteAudience = (id) =>
  API.delete(`/audience/delete/${id}`);


// ==================== CAMPAIGNS ====================

export const getCampaigns = () => API.get("/campaign/all");


export const sendCampaign =(id)=>
API.post(`/campaign/send/${id}`);

export const deleteCampaign=(id)=>{
  API.delete(`/campaign/delete/${id}`);
}
export const createCampaign = (data) =>
  API.post("/campaign/create", data);

export default API;