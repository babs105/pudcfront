import axios from "../axios/axios";
import { authenticationHelper } from "../utils/AuthenticationHelper";

export const panneService = {
  createPanne,
  getAllPanne,
  getPanneById,
  getPanneByIdComite,
};

function createPanne(data) {
  // const requestOptions = user;
  return axios
    .post("/panne/create", data)
    .then(handleResponse)
    .then((panne) => panne);
}

function getAllPanne() {
  return axios
    .get("/panne/getAllPanne")
    .then(handleResponse)
    .then((panne) => panne);
}

function getPanneById(id) {
  return axios
    .get(`/panne/getPanneById/${id}`)
    .then(handleResponse)
    .then((panne) => panne);
}
function getPanneByIdComite(idComite) {
  return axios
    .get(`/panne/getPanneByIdComite/${idComite}`)
    .then(handleResponse)
    .then((panne) => panne);
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

// function handleRegisterResponse(response) {
//   const { data } = response;
//   if (response.status === 401) {
//     const error = (data && data.message) || response.statusText;
//     console.log("handleRegisterResponse => error");
//     console.log(error);
//     return Promise.reject(error);
//   }

//   return data;
// }
