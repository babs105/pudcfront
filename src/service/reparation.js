import axios from "../axios/axios";
import { authenticationHelper } from "../utils/AuthenticationHelper";

export const reparationService = {
  createReparation,
  getAllReparation,
  getReparationById,
  getReparationByIdComite,
};

function createReparation(data) {
  // const requestOptions = user;
  return axios
    .post("/reparation/create", data)
    .then(handleResponse)
    .then((Reparation) => Reparation);
}

function getAllReparation() {
  return axios
    .get("/reparation/getAllReparation")
    .then(handleResponse)
    .then((Reparation) => Reparation);
}

function getReparationById(id) {
  return axios
    .get(`/reparation/getReparationById/${id}`)
    .then(handleResponse)
    .then((Reparation) => Reparation);
}
function getReparationByIdComite(idComite) {
  return axios
    .get(`/reparation/getReparationByIdComite/${idComite}`)
    .then(handleResponse)
    .then((Reparation) => Reparation);
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
