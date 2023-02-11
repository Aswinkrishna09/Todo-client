import axios from "axios";

const baseURL = "http://localhost:5000";

// "Authorization": `Bearer ${userInfo.token}`,
export const userLogin = async (user) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(baseURL + "/api/users/login", user, config);
  console.log(data);
  if (data.error == 1) {
    return data;
  }
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const userRegister = async (user) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(
    baseURL + "/api/users/register",
    user,
    config
  );
  console.log(data);
  if (data.error == 1) {
    return data;
  }
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const GetTodos = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(
    baseURL + "/api/users/getAllTodoCards",
    config
  );
  return data
};

export const AddTodos = async (obj) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    baseURL + "/api/users/addtodoCard",
    obj,
    config
  );
  return data
};
