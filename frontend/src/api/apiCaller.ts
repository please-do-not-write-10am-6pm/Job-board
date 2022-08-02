import axios from "axios";

const BaseUrl: string = "http://192.168.115.130:3000";

axios.interceptors.request.use(
  (config: any) => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//auth api
export const register = (data: object) =>
  axios.post(`${BaseUrl}/api/signUp`, data);
export const login = (data: object) =>
  axios.post(`${BaseUrl}/api/signIn`, data);

// approve user
export const approveUser = (id: number) =>
  axios.patch(`${BaseUrl}/api/users/${id}/approve`);
export const blockUser = (id: number) =>
  axios.patch(`${BaseUrl}/api/users/${id}/block`);

// approve job
export const approveJob = (id: number) =>
  axios.patch(`${BaseUrl}/api/jobs/${id}/approve`);
export const blockJob = (id: number) =>
  axios.patch(`${BaseUrl}/api/jobs/${id}/block`);

// profile api
export const getProfile = () => axios.get(`${BaseUrl}/api/profile`);
export const editProfile = (data: object) =>
  axios.patch(`${BaseUrl}/api/profile`, data);

// user api
export const getAllUser = () => axios.get(`${BaseUrl}/api/users`);
export const getUser = (id: number) => axios.get(`${BaseUrl}/api/users/${id}`);
export const createUser = (data: object) =>
  axios.post(`${BaseUrl}/api/users`, data);
export const updateUser = (data: { id: number; data: object }) =>
  axios.patch(`${BaseUrl}/api/users/${data.id}`, data.data);
export const deleteUser = (id: number) =>
  axios.delete(`${BaseUrl}/api/users/${id}`);

// job api
export const getAllJobs = () => axios.get(`${BaseUrl}/api/jobs`);
export const getJob = (id: number) => axios.get(`${BaseUrl}/api/jobs/${id}`);
export const createJob = (data: object) =>
  axios.post(`${BaseUrl}/api/jobs`, data);
export const updateJob = (data: { id: number; data: object }) =>
  axios.patch(`${BaseUrl}/api/jobs/${data.id}`, data.data);
export const deleteJob = (id: number) =>
  axios.delete(`${BaseUrl}/api/jobs/${id}`);

// bid api
export const getAllBidsOnEachJob = (jobId: number) =>
  axios.get(`${BaseUrl}/api/bids/job/${jobId}`);
export const getBid = (ids: { jobId: number; bidId: number }) =>
  axios.get(`${BaseUrl}/api/bids/job/${ids.jobId}/${ids.bidId}`);
export const createBid = (data: { data: object; jobId: number }) =>
  axios.post(`${BaseUrl}/api/bids/job/${data.jobId}`, data.data);
export const updateBid = (data: {
  data: object;
  jobId: number;
  bidId: number;
}) =>
  axios.patch(`${BaseUrl}/api/bids/job/${data.jobId}/${data.bidId}`, data.data);
export const deleteBid = (ids: { jobId: number; bidId: number }) =>
  axios.delete(`${BaseUrl}/api/bids/job/${ids.jobId}/${ids.bidId}`);
