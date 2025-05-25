import api from "./NetworkApiService";

// GET request
export const getData = async (url, params = {}) => {
  const response = await api.get(url, { params });
  return response.data;
};

// POST request
export const postData = async (url, body = {}) => {
  const response = await api.post(url, body);
  return response.data;
};

// PUT request
export const putData = async (url, body = {}) => {
  const response = await api.put(url, body);
  return response.data;
};

// DELETE request
export const deleteData = async (url, body = {}) => {
  const response = await api.delete(url, { data: body });
  return response.data;
};

// Multipart POST (for file uploads)
export const postMultipartData = async (url, body = {}, files = []) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  files.forEach(({ key, file }) => {
    formData.append(key, file);
  });

  const response = await api.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
