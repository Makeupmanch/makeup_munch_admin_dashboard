import axios from "axios";

const API_BASE_URL =
  // process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";
  process.env.REACT_APP_API_BASE_URL || "https://kamraa.vercel.app/";

  

const environment = process.env.NODE_ENV;

if (environment === "development") {
  console.log("Running in development mode");
} else if (environment === "production") {
  console.log("Running in production mode");
} else if (environment === "test") {
  console.log("Running in test mode");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

api.interceptors.request.use(
  (config) => {
    // Check if data is a FormData object
    console.log("application/json");
    if (config.data instanceof FormData) {
      console.log("Sending multipart/form-data");

      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      console.log("Sending application/json");

      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);

    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
