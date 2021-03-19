import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { equipementService } from "../../service/equipementService";

const schema = yup.object().shape({
  typeEquipement: yup.string().required(),
  dateReception: yup.date().required(),
  image: yup
    .mixed()
    .required("Charger le fichier")
    .test("fileSize", "Charger le fichier ou fichier trop lourd", (value) => {
      return value.length && value[0].size <= 2000000;
    }),
});
function AddEquipment({ match }) {
  const [listeVillagePolarise, setListeVillagePolarise] = useState([]);
  const [village, setVillage] = useState("");
  const [logging, setlogging] = useState(false);

  const [message, setmessage] = useState("");

  const removeItemListeVillage = (item) =>
    setListeVillagePolarise(
      listeVillagePolarise.filter((member) => member.id !== item.id)
    );

  const addVillagePolarise = (event) => {
    event.preventDefault();
    setListeVillagePolarise([
      ...listeVillagePolarise,
      { id: uuidv4(), villageName: village },
    ]);
  };

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const dateReception = watch("dateReception");
  const onSubmit = (data) => {
    console.log(dateReception);

    setlogging(true);
    const equipment = {
      dateReception: data.dateReception,
      idComite: idComite,
      typeEquipement: data.typeEquipement,
      entreposage: data.entreposage,
      operateurMaintenance: data.operateurMaintenance,
      statutEquipment: "EN MARCHE",
      villagePolarise: listeVillagePolarise,
    };
    const formData = new FormData();
    formData.append("photoEntreposage", data.image[0]);
    formData.append("equipment", JSON.stringify(equipment));
    console.log(formData.get("photoEntreposage"));
    console.log(formData.get("equipment"));
    equipementService
      .createEquipment(formData)
      .then((res) => {
        setlogging(false);
        setmessage("Equipement créé avec succes");
        console.log(res);
      })
      .catch((e) => {
        setlogging(false);
        setmessage("Echec création comité ressayez");
        console.log(e);
      });
  };

  let idComite = match.params.idComite;
  return (
    <>
      <div className=" bg-gray-800 flex flex-col  items-center justify-start  antialiased font-quicksand w-full h-screen ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-gray-200 sm:w-6/12 rounded-lg p-4 mt-2"
        >
          <h2 className="text-center font-bold uppercase text-xl m-3">
            Ajout Equipement
          </h2>
          <div className="flex flex-col space-y-8 sm:flex-row sm:justify-center sm:space-x-12 sm:space-y-0  ">
            {" "}
            <div className="flex flex-col space-y-4 sm:w-4/12">
              <div>
                {" "}
                <label> Date de Réception</label>
                <input
                  className=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateReception"
                />
                {dateReception}
                {errors.dateReception && (
                  <span class="text-sm font-bold text-red-600 ">
                    Date Reception invalide
                  </span>
                )}
              </div>
              <div>
                <label> Type équipement : </label>
                <select
                  className="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="typeEquipement"
                >
                  <option value="décortiqueuse">décortiqueuse</option>
                  <option value="décortiqueuse">décortiqueuse</option>
                  <option value="decortiqueuse">décortiqueuse</option>
                </select>
              </div>
              <div>
                <label> Entreposage: </label>
                <select
                  className="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="entreposage"
                >
                  <option value="Abris construit">Abris construit</option>
                  <option value="abris en cours de construction">
                    Abris en cours de construction
                  </option>
                  <option value="Pas d\’abris">Pas d’abris </option>
                </select>
              </div>
              <div className="">
                Photo Entreposage
                <input
                  className=" py-2 pr-2 text-green-500 "
                  type="file"
                  name="image"
                  ref={register}
                />
                {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                {errors.image && (
                  <span className="text-sm font-bold text-red-600 ">
                    {errors.image?.message}
                  </span>
                )}
              </div>
              <div>
                <label> Opérateur de Maintenance: </label>
                <select
                  className="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="operateurMaintenance"
                >
                  <option value="STMP">STMP</option>
                  <option value="POP">POP</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:w-1/12"></div>
            <div className="flex flex-col space-y-4 sm:w-4/12">
              <div className="flex flex-col space-y-40">
                <div className=" flex flex-col space-y-5 justify-center items-center sm:justify-start sm:items-start ">
                  <h2>Liste villages polarisés</h2>{" "}
                  <div className="w-full">
                    <input
                      placeholder="Nom du Village"
                      className=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2 "
                      name="village"
                      onChange={(e) => {
                        setVillage(e.target.value);
                      }}
                    />
                    {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                    {errors.prenom && (
                      <span class="text-sm font-bold text-red-600 "></span>
                    )}
                  </div>
                  <button
                    disabled={village === ""}
                    className=" bg-green-500  text-white hover:bg-green-800 focus:outline-none p-2 rounded-lg flex justify-center items-center "
                    onClick={addVillagePolarise}
                  >
                    <svg
                      className="h-5 w-5 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>{" "}
                    Ajouter Liste
                  </button>
                  <ul className="mb-50 divide-y-2 divide-green-600 w-full">
                    {listeVillagePolarise.map((item, index) => (
                      <div className="flex justify-between space-y-3 items-center">
                        <li key={uuidv4()}>
                          {index + 1} - {item.villageName}
                        </li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            removeItemListeVillage(item);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {logging ? (
            <button
              class="bg-green-500  mt-10 w-full sm:w-1/3 mx-auto
             hover:bg-green-800 focus:outline-none flex
              text-white rounded py-2 px-4  "
            >
              {" "}
              <svg
                className="animate-spin -ml-1 mr-3 h-6 w-6 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Traitement ....
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500  mt-10 block w-full sm:w-1/3 mx-auto
               hover:bg-green-800 focus:outline-none
                text-white rounded py-2 px-4  "
            >
              Enregistrer
            </button>
          )}
          {message && (
            <div
              className="py-3 px-4 text-lg rounded-lg h-10 border-t-4 space-x-8 w-2/3 mx-auto  border-red-800 font-bold flex flex-row justify-between
            items-center bg-orange-200 text-blue-600 m-4"
            >
              {message}
              <svg
                onClick={() => {
                  setmessage("");
                }}
                className="h-5 w-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default AddEquipment;
