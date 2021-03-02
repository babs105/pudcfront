import axios from "../axios/axios";
import { authenticationHelper } from "../utils/AuthenticationHelper";

export const equipementService = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  getEquipmentByIdComite,
  declarePanneEquipment,
  cloturerPanneEquipment,
  getAllEquipmentByIdComiteEnPanne,
};

function createEquipment(data) {
  // const requestOptions = user;
  return axios
    .post("/equipement/create", data)
    .then(handleResponse)
    .then((equipement) => equipement);
}
function declarePanneEquipment(data) {
  // const requestOptions = user;
  return axios
    .post("/equipement/declarerPanne", data)
    .then(handleResponse)
    .then((equipement) => equipement);
}
function cloturerPanneEquipment(data) {
  // const requestOptions = user;
  return axios
    .post("/equipement/cloturerPanne", data)
    .then(handleResponse)
    .then((equipement) => equipement);
}
function getAllEquipment() {
  return axios
    .get("/equipement/getAllEquipment")
    .then(handleResponse)
    .then((equipement) => equipement);
}

function getEquipmentById(id) {
  return axios
    .get(`/equipement/getEquipmentById/${id}`)
    .then(handleResponse)
    .then((equipement) => equipement);
}
function getEquipmentByIdComite(idComite) {
  return axios
    .get(`/equipement/getEquipmentByIdComite/${idComite}`)
    .then(handleResponse)
    .then((equipement) => equipement);
}
function getAllEquipmentByIdComiteEnPanne(idComite) {
  return axios
    .get(`/equipement/getEquipmentByIdComiteEnPanne/${idComite}`)
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
