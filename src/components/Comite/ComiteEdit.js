import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { comiteService } from "../../service/comiteService";
import { unregister } from "react-scroll/modules/mixins/scroller";
const schema = yup.object().shape({
  nomComite: yup.string().required(),
  commune: yup.string().required(),
  dateAssembleeConstitutive: yup.string().required(),
  image: yup.mixed().when("watchShowUploadPhoto", {
    is: true,
    then: yup
      .mixed()
      .test("fileSize", "Charger le fichier ou fichier trop lourd", (value) => {
        return value.length && value[0].size <= 2000000;
      }),
  }),
});
function ComiteEdit({ match }) {
  const [comite, setcomite] = useState({});

  const [listeMembre, setListeMembre] = useState([]);
  const [listePresence, setListePresence] = useState([]);
  const [logging, setlogging] = useState(false);
  const [idMember, setIdMember] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [poste, setPoste] = useState("");
  const [isRecepisse, setIsRecepisse] = useState(false);
  const [idPerson, setIdPerson] = useState("");
  const [prenomP, setPrenomP] = useState("");
  const [nomP, setNomP] = useState("");
  const [profession, setProfession] = useState("");
  const [message, setmessage] = useState("");
  let idComite = match.params.id;

  useEffect(() => {
    getComiteById(idComite);
  }, []);

  const getComiteById = (id) => {
    comiteService
      .getComiteById(id)
      .then((res) => {
        console.log(res);
        setcomite(res);
        setListePresence(res.listePresence);
        setListeMembre(res.membres);
      })
      .catch((e) => console.log(e));
  };

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const watchRegion = watch("region", " ");
  const watchShowUploadPhoto = watch("watchShowUploadPhoto", false);

  const onSubmit = (data) => {
    console.log(data.nomComite);
    // console.log(data.image[0]);
    setlogging(true);
    const comite = {
      id: idComite,
      nomComite: data.nomComite,
      region: data.region,
      departement: data.departement,
      commune: data.commune,
      quartierVillage: data.quartierVillage,
      nomChefVillage: data.nomChefVillage,
      telChefVillage: data.telChefVillage,
      numRecepisse: data.numRecepisse,
      dateAssembleeInfo: formatDate(data.dateAssembleeInfo),
      dateAssembleeConstitutive: formatDate(data.dateAssembleeConstitutive),
      nbreEquipement: data.nbreEquipement,
      membres: listeMembre,
      listePresence: listePresence,
    };
    console.log(comite);
    const formData = new FormData();
    watchShowUploadPhoto
      ? formData.append("photoPresidente", data.image[0])
      : formData.append("photoPresidente", null);

    // formData.append("photoPresidente", data.image[0]);
    formData.append("comite", JSON.stringify(comite));
    console.log(formData.get("photoPresidente"));
    console.log(formData.get("comite"));
    comiteService
      .updateComite(formData)
      .then((res) => {
        setlogging(false);
        setmessage("Modification effectuée avec succes");
        console.log(res);
      })
      .catch((e) => {
        setlogging(false);
        setmessage("Echéc opération ressayez");
        console.log(e);
      });
  };
  function formatDate(date) {
    return date.split("/").reverse().join("-");
  }
  const editListePresence = (event) => {
    event.preventDefault();
    let personToEdit = {
      id: idPerson,
      prenom: prenomP,
      nom: nomP,
      profession: profession,
    };
    console.log(personToEdit);
    setListePresence(
      listePresence.map((item) =>
        item.id === personToEdit.id ? personToEdit : item
      )
    );
    setIdPerson("");
    setPrenomP("");
    setNomP("");
    setProfession("");
  };
  const editListMember = (event) => {
    event.preventDefault();
    let memberToEdit = {
      id: idMember,
      prenom: prenom,
      nom: nom,
      poste: poste,
    };
    console.log(memberToEdit);
    setListeMembre(
      listeMembre.map((item) =>
        item.id === memberToEdit.id ? memberToEdit : item
      )
    );
    setIdMember("");
    setPrenom("");
    setNom("");
    setPoste("");
  };

  const removeItemListePresence = (item) => {
    console.log(item);
    setListePresence(listePresence.filter((present) => present.id !== item.id));
  };
  const removeItemListeMembre = (item) =>
    setListeMembre(listeMembre.filter((member) => member.id !== item.id));
  return (
    <>
      <div className=" bg-gray-800 antialiased  flex flex-col  items-center justify-center  font-quicksand w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-gray-200 sm:w-11/12 rounded-lg m-4 p-10"
        >
          <h2 className="text-center  font-bold uppercase text-xl mb-2">
            Modification Comite
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
                  defaultValue={comite.nomComite}
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

              <div>
                {" "}
                <label> Numéro récépissé</label>
                <input
                  class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                  ref={register}
                  defaultValue={comite.numRecepisse}
                  type="text "
                  name="numRecepisse"
                />{" "}
                {errors.numRecepisse && (
                  <span class="text-sm font-bold text-red-600 ">
                    numRecepisse invalide
                  </span>
                )}
              </div>

              <div>
                <label> Région : </label>
                <input
                  class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  defaultValue={comite.region}
                  name="region"
                />
              </div>
              {watchRegion === "Ziguinchor" && (
                <div>
                  <label> Département : </label>
                  <select
                    class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                    ref={register}
                    type="text"
                    defaultValue={comite.departement}
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
                    defaultValue={comite.departement}
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
                    defaultValue={comite.departement}
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
                  defaultValue={comite.commune}
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
                  Nombre d'équipement :{" "}
                </label>
                <select
                  class="text-gray-900 py-2 rounded   w-4/12  focus:outline-none focus:border-green-400 border-2"
                  ref={register}
                  type="text"
                  name="nbreEquipement"
                  defaultValue={comite.nbreEquipement}
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
                  defaultValue={comite.quartierVillage}
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
                  defaultValue={comite.nomChefVillage}
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
                  defaultValue={comite.telChefVillage}
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
                  type="text"
                  name="dateAssembleeInfo"
                  defaultValue={comite.dateAssembleeInfo}
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
                  type="text"
                  //   value={comite.dateAssembleeConstitutive}
                  name="dateAssembleeConstitutive"
                  defaultValue={comite.dateAssembleeConstitutive}
                />
                {errors.dateAssembleeConstitutive && (
                  <span class="text-sm font-bold text-red-600 ">
                    dateAssembleeConstitutive invalide
                  </span>
                )}
              </div>

              <div class="">
                Photo Présidente
                <img
                  class="object-fill w-40 h-40"
                  src={`data:**/*;base64,${comite.photoPresidente}`}
                  alt="presidente"
                />
                <div className="mt-4 flex items-center justify-start space-x-4 ">
                  <label> Changer Photo?</label>
                  <input
                    type="checkbox"
                    name="watchShowUploadPhoto"
                    ref={register}
                  />
                </div>
                {watchShowUploadPhoto ? (
                  <input
                    class=" py-2 text-green-500 "
                    type="file"
                    name="image"
                    ref={register}
                  />
                ) : (
                  ""
                )}
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
                  <h2>Membres du comité directeur</h2>
                  <div className="w-full">
                    <input
                      placeholder="Prenom"
                      class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2 "
                      name="prenomP"
                      value={prenomP}
                      onChange={(e) => {
                        setPrenomP(e.target.value);
                      }}
                    />
                    {/* <button className=" bg-orange-500 px-10 py-1" onClick={() => {}}>
              Upload!
            </button> */}
                    {errors.prenomP && (
                      <span class="text-sm font-bold text-red-600 "></span>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      class=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                      placeholder="Nom"
                      name="nomP"
                      value={nomP}
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
                      value={profession}
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
                    onClick={editListePresence}
                  >
                    <svg
                      className=" w-5 h-5 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Modifier
                  </button>

                  <ul className="mb-50 divide-y-2 divide-green-500 w-full">
                    {listePresence.map((present, index) => (
                      <div className="flex justify-between space-y-3 items-center">
                        {" "}
                        <li key={present.id}>
                          {index + 1} - {present.prenom} - {present.nom} -
                          {present.profession}
                        </li>
                        <div className="flex space-x-3">
                          <svg
                            onClick={() => {
                              setIdPerson(present.id);
                              setPrenomP(present.prenom);
                              setNomP(present.nom);
                              setProfession(present.profession);
                            }}
                            className="text-green-600 w-5 h-5 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
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
                    value={prenom}
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
                    value={nom}
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
                  <input
                    class="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                    type="text"
                    value={poste}
                    name="poste"
                    onChange={(e) => setPoste(e.target.value)}
                  />
                </div>
                <button
                  disabled={nom === "" || prenom === "" || poste === ""}
                  className=" bg-green-500 text-white hover:bg-green-800 p-2 focus:outline-none rounded-lg flex justify-center items-center "
                  onClick={editListMember}
                >
                  <svg
                    className="w-5 h-5 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Modifier
                </button>
                <ul className=" divide-y-2  divide-green-500 w-full">
                  {listeMembre.map((member, index) => (
                    <div className="flex justify-between space-y-3 items-center">
                      <li key={member.id}>
                        {index + 1} - {member.prenom} - {member.nom} -{" "}
                        {member.poste}
                      </li>
                      <div className="flex space-x-4">
                        <svg
                          onClick={() => {
                            setIdMember(member.id);
                            setPrenom(member.prenom);
                            setNom(member.nom);
                            setPoste(member.poste);
                          }}
                          className="text-green-600 w-5 h-5 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
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

export default ComiteEdit;
