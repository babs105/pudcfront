import axios from "../axios/axios";
import { authenticationHelper } from "../utils/AuthenticationHelper";

export const vehiculeService = {
  createVehicule,
  getAllVehicule,
};

function createVehicule(data) {
  // const requestOptions = user;
  return axios
    .post("/photo/upload", data)
    .then(handleResponse)
    .then((vehicule) => vehicule);
}
function getAllVehicule() {
  return axios
    .get("/photo/getAllVehicule")
    .then(handleResponse)
    .then((vehicule) => vehicule);
}

function logout() {
  authenticationHelper.logout();
  localStorage.removeItem("idUser");
}

function handleResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      // eslint-disable-next-line no-restricted-globals
      location.reload(true);
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log("handleRegisterResponse => error");
    console.log(error);
    return Promise.reject(error);
  }

  return data;
}
