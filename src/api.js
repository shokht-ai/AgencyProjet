import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;


const api = async ({
  endpoint = "",
  method = "GET",
  data = null,
  withCredentials = false,
  headers = {},
}) => {
  try {
    const accessToken = localStorage.getItem("access_token") || null;
    const response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method,
      data,
      withCredentials,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...headers,
      },
    });

    return {
      ok: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status || 500,
      data: error.response?.data || { message: "Server error" },
    };
  }
};

export default api;
