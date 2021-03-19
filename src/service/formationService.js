import axios from "../axios/axios";
import { authenticationHelper } from "../utils/AuthenticationHelper";

export const formationService = {
  createFormation,
  getAllFormation,
  getFormationById,
  getFormationByIdComite,
};

function createFormation(data) {
  // const requestOptions = user;
  return axios
    .post("/formation/create", data)
    .then(handleResponse)
    .then((equipement) => equipement);
}

function getAllFormation() {
  return axios
    .get("/formation/getAllFormation")
    .then(handleResponse)
    .then((equipement) => equipement);
}

function getFormationById(id) {
  return axios
    .get(`/formation/getFormationtById/${id}`)
    .then(handleResponse)
    .then((equipement) => equipement);
}
function getFormationByIdComite(idComite) {
  return axios
    .get(`/formation/getFormationByIdComite/${idComite}`)
    .then(handleResponse)
    .then((equipement) => equipement);
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
