import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { formationService } from "../../service/formationService";

const schema = yup.object().shape({
  themeFormation: yup.string().required(),
  lieuFormation: yup.string().required(),
  dateFormation: yup.date().required(),
  //   image: yup
  //     .mixed()
  //     .required("Charger le fichier")
  //     .test("fileSize", "Charger le fichier ou fichier trop lourd", (value) => {
  //       return value.length && value[0].size <= 2000000;
  //     }),
});
function AddFormation({ match }) {
  const [village, setVillage] = useState("");
  const [logging, setlogging] = useState(false);

  const [message, setmessage] = useState("");

  //   const removeItemListeVillage = (item) =>
  //     setListeVillagePolarise(
  //       listeVillagePolarise.filter((member) => member.id !== item.id)
  //     );

  //   const addVillagePolarise = (event) => {
  //     event.preventDefault();
  //     setListeVillagePolarise([
  //       ...listeVillagePolarise,
  //       { id: uuidv4(), villageName: village },
  //     ]);
  //   };

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const dateFormation = watch("dateFormation");
  const onSubmit = (data) => {
    console.log(dateFormation);

    setlogging(true);
    const formation = {
      dateFormation: data.dateFormation,
      idComite: idComite,
      themeFormation: data.themeFormation,
      lieuFormation: data.lieuFormation,
      dureeFormation: data.dureeFormation,
      personnesFormees: data.personnesFormees,
    };
    // const formData = new FormData();
    // formData.append("photoEntreposage", data.image[0]);
    // formData.append("equipment", JSON.stringify(equipment));
    // console.log(formData.get("photoEntreposage"));
    // console.log(formData.get("equipment"));
    formationService
      .createFormation(formation)
      .then((res) => {
        setlogging(false);
        setmessage("Formation créée avec succes");
        console.log(res);
      })
      .catch((e) => {
        setlogging(false);
        setmessage("Echec création Formation ressayez");
        console.log(e);
      });
  };

  let idComite = match.params.idComite;
  return (
    <>
      <div className=" bg-gray-800 flex flex-col items-center justify-start  antialiased font-quicksand w-full h-screen ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-gray-200  rounded-lg py-5 p-4  m-2"
        >
          <h2 className="text-center font-bold uppercase text-xl m-3">
            Ajout Formation
          </h2>
          <div className="flex flex-col space-y-8 sm:flex-row sm:justify-center sm:space-x-12 sm:space-y-0  px-4 ">
            {" "}
            <div className="flex flex-col space-y-4">
              <div>
                {" "}
                <label> Date de la Formation</label>
                <input
                  className=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateFormation"
                />
                {errors.dateFormation && (
                  <span class="text-sm font-bold text-red-600 ">
                    Date Formation invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Thème de la Formation</label>
                <input
                  className=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text"
                  name="themeFormation"
                />
                {errors.themeFormation && (
                  <span class="text-sm font-bold text-red-600 ">
                    theme Formation invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label>Lieu de la Formation </label>
                <input
                  className=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text"
                  name="lieuFormation"
                />
                {errors.lieuFormation && (
                  <span class="text-sm font-bold text-red-600 ">
                    lieu Formation invalide
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                {" "}
                <label>Durée de la Formation </label>
                <input
                  className=" text-gray-900 py-2 rounded px-4 w-1/2 focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text"
                  name="dureeFormation"
                />
                {errors.dureeFormation && (
                  <span class="text-sm font-bold text-red-600 ">
                    duree Formation invalide
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                {" "}
                <label>Nombre personnes formées</label>
                <input
                  className=" text-gray-900 py-2 rounded px-4 w-1/2 focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text"
                  name="personnesFormees"
                />
                {errors.personnesFormees && (
                  <span class="text-sm font-bold text-red-600 ">
                    personnesFormees invalide
                  </span>
                )}
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

export default AddFormation;
