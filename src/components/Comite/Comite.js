import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { comiteService } from "../../service/comiteService";

const schema = yup.object().shape({
  nomComite: yup.string().required(),
  commune: yup.string().required(),
  dateAssembleeConstitutive: yup.date().required(),
  image: yup
    .mixed()
    .required("Charger le fichier")
    .test("fileSize", "Charger le fichier ou fichier trop lourd", (value) => {
      console.log(value);
      return value.length && value[0].size <= 2000000;
    })
    .test("fileFormat", "format autorisé .jpg ou .jpeg ou .png ", (value) => {
      console.log(value);
      return (
        value.length &&
        ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
});
function Comite() {
  const [listeMembre, setListeMembre] = useState([]);
  const [listePresence, setListePresence] = useState([]);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [poste, setPoste] = useState("");
  const [isRecepisse, setIsRecepisse] = useState(false);

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
    // setPrenom("");
    // setNom("");
    // setPoste("Poste");
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
  const watchShowRecepisse = watch("showRecepisse", false);
  const watchShowNombreEquipement = watch("showNombreEquipement", false);

  const watchRegion = watch("region", " ");
  const onSubmit = (data) => {
    console.log(watch.value);
    setlogging(true);
    const comite = {
      // dateCreation: data.dateCreation,
      nomComite: data.nomComite,
      region: data.region,
      departement: data.departement,
      commune: data.commune,
      quartierVillage: data.quartierVillage,
      nomChefVillage: data.nomChefVillage,
      telChefVillage: data.telChefVillage,
      numRecepisse: data.numRecepisse,
      dateAssembleeInfo: data.dateAssembleeInfo,
      dateAssembleeConstitutive: data.dateAssembleeConstitutive,
      nbreEquipement: data.nbreEquipement,
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
      <div className=" bg-gray-800 antialiased  flex flex-col  items-center justify-center  font-quicksand w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-gray-200 sm:w-11/12 rounded-lg m-4 p-10"
        >
          <h2 className="text-center  font-bold uppercase text-xl mb-2">
            Ajout Comite
          </h2>
          <div className="flex flex-col space-y-8 sm:flex-row sm:mx-auto sm:space-x-12 sm:space-y-0  ">
            {" "}
            <div className="flex flex-col space-y-4 sm:w-6/12">
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
                    Dénomination invalide
                  </span>
                )}
              </div>
              {/* <div>
                {" "}
                <label> Date Création</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateCreation"
                />
                {errors.dateCreation && (
                  <span class="text-sm font-bold text-red-600 ">
                    date Création invalide
                  </span>
                )}
              </div> */}
              <label> Avez-vous un récépissé ?</label>
              <div>
                {" "}
                Oui{"  "}
                <input type="checkbox" name="showRecepisse" ref={register} />
              </div>
              {watchShowRecepisse && (
                <div>
                  {" "}
                  <label> Numéro récépissé</label>
                  <input
                    class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                    ref={register}
                    type="text "
                    name="numRecepisse"
                  />{" "}
                  {errors.numRecepisse && (
                    <span class="text-sm font-bold text-red-600 ">
                      numRecepisse invalide
                    </span>
                  )}
                </div>
              )}
              <div>
                <label> Région : </label>
                <select
                  class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="region"
                >
                  <option value="Région">Région</option>
                  <option value="Ziguinchor">Ziguinchor</option>
                  <option value="Tambacounda">Tambacounda</option>
                  <option value="Sédhiou">Sédhiou</option>
                  <option value="Kédougou">Kédougou</option>
                  <option value="Kolda">Kolda</option>
                  <option value="Louga">Louga</option>
                  <option value="Matam">Matam</option>
                  <option value="Saint-Louis">Saint-Louis</option>
                  <option value="Dakar">Dakar</option>
                  <option value="Diourbel">Diourbel</option>
                  <option value="Fatick">Fatick</option>
                  <option value="Thiès">Thiès</option>
                  <option value="Kaffrine">Kaffrine</option>
                  <option value="Kaolack">Kaolack</option>
                </select>
              </div>
              {watchRegion === "Ziguinchor" && (
                <div>
                  <label> Département : </label>
                  <select
                    class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                    ref={register}
                    type="text"
                    name="departement"
                  >
                    <option value="Ziguinchor">Ziguinchor</option>
                    <option value="Bignona">Bignona</option>
                    <option value="Oussouye">Oussouye</option>
                  </select>
                </div>
              )}
              {watchRegion === "Kolda" && (
                <div>
                  <label> Département : </label>
                  <select
                    class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                    ref={register}
                    type="text"
                    name="departement"
                  >
                    <option value="Kolda">Kolda</option>
                    <option value="Medina Yero Foulah">
                      Medina Yero Foulah
                    </option>
                    <option value=" Vélingara"> Vélingara</option>
                  </select>
                </div>
              )}
              {watchRegion === "Sédhiou" && (
                <div>
                  <label> Département : </label>
                  <select
                    class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                    ref={register}
                    type="text"
                    name="departement"
                  >
                    <option value="Sédhiou">Sédhiou</option>
                    <option value="Goudomp">Goudomp</option>
                    <option value="Bounkiling"> Bounkiling</option>
                  </select>
                </div>
              )}

              <div>
                <label> Commune : </label>
                <input
                  class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="commune"
                />
                {errors.commune && (
                  <span class="text-sm font-bold text-red-600 ">
                    commune invalide
                  </span>
                )}
              </div>

              <div>
                <label
                  className="pr-3
                  "
                >
                  {" "}
                  Nombre d'équipement :{" "}
                </label>
                <select
                  class="text-gray-900 py-2 rounded   w-4/12  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="nbreEquipement"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:w-6/12">
              <div>
                {" "}
                <label> Village/Quartier</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text "
                  name="quartierVillage"
                />
                {errors.quartierVillage && (
                  <span class="text-sm font-bold text-red-600 ">
                    quartier/Village invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Nom Chef de Village</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text "
                  name="nomChefVillage"
                />
                {errors.nomChefVillage && (
                  <span class="text-sm font-bold text-red-600 ">
                    nom Chef de Village invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label> Telephone Chef de village</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="text "
                  name="telChefVillage"
                />
                {errors.telChefVillage && (
                  <span class="text-sm font-bold text-red-600 ">
                    nom Chef de Village invalide
                  </span>
                )}
              </div>
              <div>
                {" "}
                <label>Date Assemblée d'information</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  type="date"
                  name="dateAssembleeInfo"
                />
                {errors.dateAssembleeInfo && (
                  <span class="text-sm font-bold text-red-600 ">
                    date Assemblee Info invalide
                  </span>
                )}
              </div>
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
                  accept=".jpg, .jpeg, .png"
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
            </div>
            <div className="flex flex-col space-y-4 sm:w-6/12">
              <div className="flex flex-col space-y-40">
                <div className=" flex flex-col space-y-5 justify-center items-center sm:justify-start sm:items-start ">
                  <h2>Membres du comité directeur</h2>{" "}
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
                    className=" bg-green-500  text-white hover:bg-green-800 focus:outline-none p-2 rounded-lg flex justify-center items-center "
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
                    Ajouter Liste
                  </button>
                  <ul className="mb-50 divide-y-2 divide-green-500 w-full">
                    {listePresence.map((present, index) => (
                      <div className="flex justify-between space-y-3 items-center">
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
                          className="w-5 h-5 cursor-pointer text-red-500"
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
              </div>
            </div>
            <div className="flex flex-col space-y-4 sm:w-6/12">
              <div className=" flex flex-col space-y-5 justify-center items-center sm:justify-start sm:items-start ">
                {" "}
                <h2>Membres du bureau </h2>
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
                    <option value="Vice-présidente 1">Vice-présidente 1</option>
                    <option value="Vice-présidente 2">Vice-présidente 2</option>
                    <option value="Secrétaire Générale">
                      Secrétaire Générale
                    </option>
                    <option value="Secrétaire Générale Adjointe">
                      Secrétaire Générale Adjointe
                    </option>
                    <option value="Trésorière Générale">
                      Trésorière Générale
                    </option>
                    <option value="Trésorière Générale Adjointe">
                      Trésorière Générale Adjointe
                    </option>
                    <option value="Commissaire au compte 1">
                      Commissaire au compte 1
                    </option>
                    <option value="Commissaire au compte 2">
                      Commissaire au compte 2
                    </option>
                    <option value="Commissaire au compte 3">
                      Commissaire au compte 3
                    </option>
                  </select>
                </div>
                <button
                  disabled={nom === "" || prenom === "" || poste === ""}
                  className=" bg-green-500 text-white hover:bg-green-800 p-2 focus:outline-none rounded-lg flex justify-center items-center "
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
                  Ajouter Liste
                </button>
                <ul className=" divide-y-2  divide-green-500 w-full">
                  {listeMembre.map((member, index) => (
                    <div className="flex justify-between space-y-3 items-center">
                      <li key={uuidv4()}>
                        {index + 1} - {member.prenom} - {member.nom} -{" "}
                        {member.poste}
                      </li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 cursor-pointer text-red-500"
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
              className="py-3 px-4 text-lg rounded-lg h-10 border-t-4 space-x-8 w-2/3 mx-auto  border-red-800 font-bold flex flex-row justify-between
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
