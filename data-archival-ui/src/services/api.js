import axios from 'axios';

const BASE_URL = 'http://44.211.192.140:8080/api';

export const login = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    username,
    password
  });
  return res.data; // Expected: { token: "..." }
};

export const register = async (username, password, role = "User") => {
  const res = await axios.post(`${BASE_URL}/auth/register`, {
    username,
    password,
    roles: role // Schema says "Admin", "User", "Student", "Teacher"
  });
  return res.data;
};

export const runArchive = async (token) => {
  const res = await axios.post(`${BASE_URL}/archival/run`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const runDelete = async (token, deletionRequest) => {
  // deletionRequest = { sourceTable, cutoffDate, pageSize }
  const res = await axios.post(`${BASE_URL}/archival/delete`, deletionRequest, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const saveConfig = async (token, config) => {
  // config = { archiveAfterMonths, deleteAfterMonths, pageSize, tableName, criteriaColumn }
  const res = await axios.post(`${BASE_URL}/archival/config`, config, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getConfigs = async (token) => {
  const res = await axios.get(`${BASE_URL}/archival/config`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const viewArchived = async (token, tableName) => {
  const res = await axios.get(`${BASE_URL}/archival/view/${tableName}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
