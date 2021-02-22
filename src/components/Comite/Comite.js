import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { comiteService } from "../../service/comiteService";

const schema = yup.object().shape({
  nomComite: yup.string().required(),
  dateCreation: yup.date().required(),
  image: yup
    .mixed()
    .required("Charger le fichier")
    .test("fileSize", "Charger le fichier ou fichier trop lourd", (value) => {
      return value.length && value[0].size <= 2000000;
    }),
});
function Comite() {
  const [listeMembre, setListeMembre] = useState([]);
  const [listePresence, setListePresence] = useState([]);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [poste, setPoste] = useState("");

  const [prenomP, setPrenomP] = useState("");
  const [nomP, setNomP] = useState("");
  const [profession, setProfession] = useState("");
  const [logging, setlogging] = useState(false);
  const [message, setmessage] = useState("");

  const addListPresence = (event) => {
    event.preventDefault();

    setListePresence([
      ...listePresence,
      { id: uuidv4(), prenom: prenomP, nom: nomP, profession: profession },
    ]);
    // setPrenomP("");
    // setNomP("");
    // setProfession("");
  };
  const removeItemListePresence = (item) => {
    console.log(item);
    setListePresence(listePresence.filter((present) => present.id !== item.id));
  };
  const removeItemListeMembre = (item) =>
    setListeMembre(listeMembre.filter((member) => member.id !== item.id));
  const addMember = (event) => {
    event.preventDefault();
    setListeMembre([
      ...listeMembre,
      { id: uuidv4(), prenom: prenom, nom: nom, tel: "", poste: poste },
    ]);
    setPrenom("");
    setNom("");
    setPoste("Poste");
  };

  // const handleChangePrenom = (event) => {
  //   setPrenom(event.target.value);
  // };
  // const handleChangeNom = (event) => {
  //   setNom(event.target.value);
  // };

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  //   const infoKilometrage = watch("infoKilometrage");
  const onSubmit = (data) => {
    // console.log(data);
    setlogging(true);
    const comite = {
      dateCreation: data.dateCreation,
      nomComite: data.nomComite,
      region: data.region,
      departement: data.departement,
      commune: data.commune,
      numRecepisse: data.numRecepisse,
      dateMissionInfo1: data.dateMissionInfo1,
      lieuMissionInfo1: data.lieuMissionInfo1,
      dateMissionInfo2: data.dateMissionInfo2,
      lieuMissionInfo2: data.lieuMissionInfo2,
      dateAssembleeInfo1: data.dateAssembleeInfo1,
      lieuAssembleeInfo1: data.lieuAssembleeInfo1,
      dateAssembleeConstitutive: data.dateAssembleeConstitutive,
      isEquipement: data.isEquipement,
      membres: listeMembre,
      listePresence: listePresence,
    };
    const formData = new FormData();
    formData.append("photoPresidente", data.image[0]);
    formData.append("comite", JSON.stringify(comite));
    console.log(formData.get("photoPresidente"));
    console.log(formData.get("comite"));
    comiteService
      .createComite(formData)
      .then((res) => {
        setlogging(false);
        setmessage("Comité créé avec succes");
        console.log(res);
      })
      .catch((e) => {
        setlogging(false);
        setmessage("Echec création comité ressayez");
        console.log(e);
      });
  };
  return (
    <>
      <div className=" font-quicksand w-full text-white antialiased">
        <form
          onSubmit={handleSubmit(onSubmit)}
          class=" mx-auto   space-y-5 p-10"
        >
          <h2 className="text-center text-xl">Ajout Comite</h2>
          <div className="flex flex-col space-y-8  sm:flex-row sm:space-x-12 sm:space-y-0  ">
            {" "}
            <div className="flex flex-col space-y-4 sm:w-1/3">
              <div>
                {" "}
                <label> Dénomination</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text "
                  name="nomComite"
                />
                {errors.nomComite && (
                  <span class="text-sm font-bold text-red-600 ">
                    nomComite invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Date Creation</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateCreation"
                />
                {errors.dateCreation && (
                  <span class="text-sm font-bold text-red-600 ">
                    dateCreation invalide
                  </span>
                )}
              </div>
              {/* <div>
            <label> Saisir le Kilometrage</label>
            <input
              class="text-gray-900 py-2 rounded  w-full  focus:outline-none focus:border-green-400 border-2"
              ref={register}
              type="checkbox"
              name="infoKilometrage"
            />
          </div> */}
              <div>
                <label> Région : </label>
                <select
                  class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="region"
                >
                  <option value="bpv">BPV</option>
                  <option value="kirene">KIRENE</option>
                  <option value="diourbel">DIOURBEL</option>
                </select>
              </div>
              <div>
                <label> Département : </label>
                <select
                  class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="departement"
                >
                  <option value="bpv">BPV</option>
                  <option value="kirene">KIRENE</option>
                  <option value="diourbel">DIOURBEL</option>
                </select>
              </div>
              <div>
                <label> Commune : </label>
                <select
                  class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="commune"
                >
                  <option value="bpv">BPV</option>
                  <option value="kirene">KIRENE</option>
                  <option value="diourbel">DIOURBEL</option>
                </select>
              </div>
              <div>
                {" "}
                <label> Numero recepissé</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text "
                  name="numRecepisse"
                />
                {errors.numRecepisse && (
                  <span class="text-sm font-bold text-red-600 ">
                    numRecepisse invalide
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:w-1/3">
              <div>
                {" "}
                <label>Date Mission d'information</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateMissionInfo1"
                />
                {errors.dateMissionInfo1 && (
                  <span class="text-sm font-bold text-red-600 ">
                    dateMissionInfo1 invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Lieu Mission d'information</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text"
                  name="lieuMissionInfo1"
                />
                {errors.lieuMissionInfo1 && (
                  <span class="text-sm font-bold text-red-600 ">
                    lieuMissionInfo1 invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label>Date Mission d'information 2</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateMissionInfo2"
                />
                {errors.dateMissionInfo2 && (
                  <span class="text-sm font-bold text-red-600 ">
                    dateMissionInfo2 invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Lieu Mission d'information 2</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text"
                  name="lieuMissionInfo1"
                />
                {errors.lieuMissionInfo2 && (
                  <span class="text-sm font-bold text-red-600 ">
                    lieuMissionInfo2 invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Date Assemblée Information</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateAssembleeInfo1"
                />
                {errors.dateAssembleeInfo1 && (
                  <span class="text-sm font-bold text-red-600 ">
                    dateAssembleeInfo1 invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Lieu Assemblée Information</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text"
                  name="lieuAssembleeInfo1"
                />
                {errors.lieuAssembleeInfo1 && (
                  <span class="text-sm font-bold text-red-600 ">
                    lieuAssembleeInfo1 invalide
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:w-1/3">
              <div>
                <label> Date Assemblée Constitutive</label>
                <input
                  class="text-gray-900 py-2 rounded px-4 w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="date"
                  name="dateAssembleeConstitutive"
                />
                {errors.dateAssembleeConstitutive && (
                  <span class="text-sm font-bold text-red-600 ">
                    dateAssembleeConstitutive invalide
                  </span>
                )}
              </div>

              <div class="">
                Photo Présidente
                <input
                  class=" py-2 text-green-500 "
                  type="file"
                  name="image"
                  ref={register}
                />
                {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                {errors.image && (
                  <span class="text-sm font-bold text-red-600 ">
                    {errors.image?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-40">
                <div className=" flex flex-col space-y-5 justify-center items-center sm:justify-start sm:items-start ">
                  <h2>Liste de Présence</h2>{" "}
                  <div className="w-full">
                    <input
                      placeholder="Prenom"
                      class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2 "
                      name="prenomP"
                      onChange={(e) => {
                        setPrenomP(e.target.value);
                      }}
                    />
                    {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                    {errors.prenom && (
                      <span class="text-sm font-bold text-red-600 "></span>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                      placeholder="Nom"
                      name="nomP"
                      onChange={(e) => {
                        setNomP(e.target.value);
                      }}
                    />
                    {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                    {errors.nomP && (
                      <span class="text-sm font-bold text-red-600 "></span>
                    )}
                  </div>
                  <div class="w-full">
                    <input
                      class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                      placeholder="Profession"
                      name="profession"
                      onChange={(e) => {
                        setProfession(e.target.value);
                      }}
                    />
                    {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                    {errors.nomP && (
                      <span class="text-sm font-bold text-red-600 "></span>
                    )}
                  </div>
                  <button
                    disabled={
                      nomP === "" || prenomP === "" || profession === ""
                    }
                    className=" bg-green-500  hover:bg-green-800 focus:outline-none p-2 rounded-lg flex justify-center items-center "
                    onClick={addListPresence}
                  >
                    <svg
                      className="h-5 w-5 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>{" "}
                    Liste Présence
                  </button>
                  <ul className="mb-50 divide-y-2 divide-white w-full">
                    {listePresence.map((present, index) => (
                      <div className="flex justify-between items-center">
                        {" "}
                        <li key={uuidv4()}>
                          {index + 1} - {present.prenom} - {present.nom} -
                          {present.profession}
                        </li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            removeItemListePresence(present);
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
                <div className=" flex flex-col space-y-5 justify-center items-center sm:justify-start sm:items-start ">
                  {" "}
                  <h2>Liste des Membres</h2>
                  <div className="w-full">
                    <input
                      class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2 "
                      name="prenom"
                      placeholder="Prenom"
                      onChange={(e) => {
                        setPrenom(e.target.value);
                      }}
                    />
                    {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                    {errors.prenom && (
                      <span class="text-sm font-bold text-red-600 "></span>
                    )}
                  </div>
                  <div className="w-full mt-4">
                    <input
                      class="  text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2 "
                      name="nom"
                      placeholder="Nom"
                      onChange={(e) => {
                        setNom(e.target.value);
                      }}
                    />
                    {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                    {errors.nom && (
                      <span class="text-sm font-bold text-red-600 "></span>
                    )}
                  </div>
                  <div className="w-full">
                    <select
                      class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                      type="text"
                      value={poste}
                      name="poste"
                      onChange={(e) => setPoste(e.target.value)}
                    >
                      <option value="Poste">Poste</option>
                      <option value="Présidente">Présidente</option>
                      <option value="Sécretaire général">
                        Sécretaire général
                      </option>
                      <option value="Trésorier">Trésorier</option>
                    </select>
                  </div>
                  <button
                    disabled={nom === "" || prenom === "" || poste === ""}
                    className=" bg-green-500  hover:bg-green-800 p-2 focus:outline-none rounded-lg flex justify-center items-center "
                    onClick={addMember}
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Liste membre
                  </button>
                  <ul className=" divide-y-2 divide-white w-full">
                    {listeMembre.map((member, index) => (
                      <div className="flex justify-between items-center">
                        <li key={uuidv4()}>
                          {index + 1} - {member.prenom} - {member.nom} -{" "}
                          {member.poste}
                        </li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5 cursor-pointer "
                          onClick={() => {
                            removeItemListeMembre(member);
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
              class="bg-green-500  mt-32 w-full sm:w-1/3 mx-auto
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
              class="bg-green-500  mt-32 block w-full sm:w-1/3 mx-auto
               hover:bg-green-800 focus:outline-none
                text-white rounded py-2 px-4  "
            >
              Enregistrer
            </button>
          )}
          {message && (
            <div
              className="py-3 px-4 text-lg rounded-lg h-10 border-t-4 space-x-8 w-1/3 mx-auto  border-red-800 font-bold flex flex-row justify-between
            items-center bg-orange-200 text-blue-600 m-4"
            >
              {message}
              <svg
                onClick={() => {
                  setmessage("");
                }}
                class="h-5 w-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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

export default Comite;
