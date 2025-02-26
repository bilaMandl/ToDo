import axios from 'axios';
// import jwt_decode from "jwt-decode";

const apiUrl =  process.env.REACT_APP_API_URL;
axios.defaults.baseURL = apiUrl;
setAuthorizationBearer();

// Add an interceptor to log response errors
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

function saveAccessToken(authResult) {
  localStorage.setItem("access_token", authResult.token);
  setAuthorizationBearer();
}

function setAuthorizationBearer() {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}
export default {
  // getLoginUser: () => {
  //   const accessToken = localStorage.getItem("access_token");
  //   if (accessToken) {
  //     return jwt_decode(accessToken);
  //   }
  //   return null;
  // },
  register: async (userName, password) => {
    const res = await axios.post("/register", { userName, password });
    saveAccessToken(res.data);
  },
  login: async (userName, password) => {
    const res = await axios.post("/login", { userName, password });
    saveAccessToken(res.data);
  },


  getTasks: async () => {
    try {
      const result = await axios.get(`/items`);
      return result.data;
    } catch (err) {
      console.error("Error fetching tasks:", err);
      throw err;
    }
  },


  addTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axios.post(`/items`, { name });
      return result.data;
    } catch (err) {
      console.error("Error adding task:", err);
      throw err;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axios.put(`/items/${id}`, { isComplete });
      return result.data;
    } catch (err) {
      console.error("Error updating task:", err);
      throw err;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      await axios.delete(`/items/${id}`);
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  }
};
