import axios from "axios";

export default function axiosWithAuth() {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
      Authorization: token,
    },
  });
}
