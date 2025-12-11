import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;


const api = async ({
  endpoint = "",
  method = "GET",
  data = null,
  withCredentials = false,
  headers = {},
  is_auth_required = true,
}) => {
  try {
    const accessToken = localStorage.getItem("access_token") || null;
    // console.log("API Request:", method, endpoint, data);
    let response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method,
      data,
      withCredentials,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && is_auth_required && { Authorization: `Bearer ${accessToken}` }),
        ...headers,
      },
    });
    // console.log("API Response:", response.status, method, endpoint,  response.data);
    return {
      ok: true,
      status: response.status,
      data: response.data,
    };

  } catch (error) {
    const status = error.response?.status;

    // 🔄 AGAR 401 bo‘lsa → refresh qilish
    if (status === 401 && is_auth_required) {
      try {
        // Refresh token cookie ichida → data = {}
        const refreshResponse = await axios.post(
          `${BASE_URL}/api/token/refresh/`,
          {},
          {
            withCredentials: true, // COOKIE YUBORISH UCHUN MUHIM
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("Refreshing access token...");
        // console.log("Refresh response:", refreshResponse.data);

        const newAccess = refreshResponse.data.access;
        localStorage.setItem("access_token", newAccess);

        // 🔁 Eski requestni qayta yuborish
        const retryResponse = await axios({
          url: `${BASE_URL}/${endpoint}`,
          method,
          data,
          withCredentials,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccess}`,
            ...headers,
          },
        });

        return {
          ok: true,
          status: retryResponse.status,
          data: retryResponse.data,
        };

      } catch (err) {
        return {
          ok: false,
          status: 401,
          data: { message: "Token muddati tugagan. Iltimos qayta tizimga kiring." }
        };
      }
    }

    return {
      ok: false,
      status: error.response?.status || 500,
      data: error.response?.data || { message: "Server error" },
    };
  }
};

export default api;
