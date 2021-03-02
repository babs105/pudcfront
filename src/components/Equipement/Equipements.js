import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { equipementService } from "../../service/equipementService";
import Pagination from "../DataTable/Pagination";
import { useHistory } from "react-router-dom";
import { panneService } from "../../service/panneService";
import { reparationService } from "../../service/reparation";

const schema1 = yup.object().shape({
  dateDeclaration: yup.date().required(),
});
const schema2 = yup.object().shape({
  dateCloture: yup.date().required(),
});
function Equipements({ match }) {
  const [openTab, setOpenTab] = React.useState(1);
  const [showModalDeclarePanne, setShowModalDeclarePanne] = React.useState(
    false
  );
  const [showModalCloturePanne, setShowModalCloturePanne] = React.useState(
    false
  );

  const [idEquipement, setidEquipement] = useState("");
  const [typeEquipement, setTypeEquipement] = useState("");
  const [equipements, setEquipements] = useState([]);
  const [pannes, setPannes] = useState([]);
  const [reparations, setReparations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nombrePerPage, setNombrePerPage] = useState(5);
  const [findKey, setFindKey] = useState("");
  const [logging, setlogging] = useState(false);
  const [message, setmessage] = useState("");
  const [statut, setStatut] = useState(false);

  useEffect(() => {
    getEquipmentByIdComite();
    getPanneByIdComite();
    getReparationByIdComite();
  }, []);

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: showModalDeclarePanne
      ? yupResolver(schema1)
      : yupResolver(schema2),
  });
  const onSubmit1 = (data) => {
    const equipment = {
      dateDeclaration: data.dateDeclaration,
      idEquipement: idEquipement,
      typeEquipement: typeEquipement,
      typePanne: data.typePanne,
      idComite: idComite,
      statutEquipment: "EN PANNE",
    };
    equipementService
      .declarePanneEquipment(equipment)
      .then((res) => {
        setlogging(false);
        setmessage("Equipement en Panne");
        console.log(res);
      })
      .catch((e) => {
        setlogging(false);
        setmessage("Echec change Statut ressayez");
        console.log(e);
      });
    console.log("declare panne");

    // console.log(equipment);
  };
  const onSubmit2 = (data) => {
    const equipment = {
      dateCloture: data.dateCloture,
      idEquipement: idEquipement,
      typeEquipement: typeEquipement,
      typePanne: data.typePanne,
      idComite: idComite,
      statutEquipment: "EN MARCHE",
    };
    console.log("cloture panne");
    equipementService
      .cloturerPanneEquipment(equipment)
      .then((res) => {
        setlogging(false);
        setmessage("Equipement En Marche");
        console.log(res);
      })
      .catch((e) => {
        setlogging(false);
        setmessage("Echec change Statut ressayez");
        console.log(e);
      });
  };
  const getEquipmentByIdComite = () => {
    setLoading(true);
    equipementService.getEquipmentByIdComite(idComite).then((res) => {
      // setLoading(false);
      console.log(res);
      setEquipements(res);
    });
  };
  const getPanneByIdComite = () => {
    setLoading(true);
    panneService.getPanneByIdComite(idComite).then((res) => {
      // setLoading(false);
      console.log(res);
      setPannes(res);
    });
  };

  const getReparationByIdComite = () => {
    setLoading(true);
    reparationService.getReparationByIdComite(idComite).then((res) => {
      // setLoading(false);
      console.log(res);
      setReparations(res);
    });
  };

  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.typeEquipement
          .toString()
          .toLowerCase()
          .indexOf(findKey.toLowerCase()) > -1 ||
        row.statutEquipement
          .toString()
          .toLowerCase()
          .indexOf(findKey.toLowerCase()) > -1
      // row.dateReception
      //   .toString()
      //   .toLowerCase()
      //   .indexOf(findKey.toLowerCase()) > -1 ||

      // const columns = rows[0] && Object.keys(rows[0]);
      // console.log(columns);
      // return rows.filter((row) =>
      //   columns.some(
      //     (column) =>
      //       row[column].toString().toLowerCase().indexOf(findKey.toLowerCase()) >
      //       -1
      //   )
      // );
    );
  };
  // const searchPanne = (rows) => {
  //   return rows.filter(
  //     (row) =>
  //       row.typeEquipement
  //         .toString()
  //         .toLowerCase()
  //         .indexOf(findKey.toLowerCase()) > -1 ||
  //       row.dateDeclaration
  //         .toString()
  //         .toLowerCase()
  //         .indexOf(findKey.toLowerCase()) > -1 ||
  //       row.statutEquipment
  //         .toString()
  //         .toLowerCase()
  //         .indexOf(findKey.toLowerCase()) > -1

  //     // const columns = rows[0] && Object.keys(rows[0]);
  //     // console.log(columns);
  //     // return rows.filter((row) =>
  //     //   columns.some(
  //     //     (column) =>
  //     //       row[column].toString().toLowerCase().indexOf(findKey.toLowerCase()) >
  //     //       -1
  //     //   )
  //     // );
  //   );
  // };
  // get current vehicule
  // const indexOfLastVehicule = currentPage * vehiculePerPage;
  // const indexOfFirstVehicule = indexOfLastVehicule - vehiculePerPage;
  // const currentVehicule = vehicule.slice(
  //   currentPage * vehiculePerPage - vehiculePerPage,
  //   currentPage * vehiculePerPage
  // );

  //get page form pagination
  const paginate = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };
  const openModalDeclarePanne = (data) => {
    setShowModalDeclarePanne(true);
    setidEquipement(data.id);
    setTypeEquipement(data.typeEquipement);
  };
  const openModalCloturePanne = (data) => {
    setShowModalCloturePanne(true);
    setidEquipement(data.id);
    setTypeEquipement(data.typeEquipement);
  };

  // useEffect(() => {
  //   getComiteById(idComite);
  // }, []);

  // const getComiteById = (id) => {
  //   comiteService
  //     .getComiteById(id)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => console.log(e));
  // };
  let idComite = JSON.parse(match.params.comiteParam).idComite;
  let nomComite = JSON.parse(match.params.comiteParam).nomComite;
  let history = useHistory();
  let color = "green";
  let i = 1,
    j = 1,
    k = 1;

  return (
    <>
      <div className="bg-gray-800 flex flex-col  text-black font-quicksand w-full">
        <h2 className="mx-auto text-xl uppercase pt-3  text-white">
          {nomComite}
        </h2>
        <div className="flex w-10/12 h-full mx-auto">
          <div className="w-full h-full">
            <ul
              className="flex mb-0 list-none flex-nowrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="mb-2 mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-lg font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Equipements
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-lg font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Pannes
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-lg font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Reparations
                </a>
              </li>
            </ul>
            <div className="flex flex-col min-w-0 break-words rounded w-full h-full">
              <div className="py-5 flex-auto">
                <div className="tab-content tab-space h-screen  ">
                  <div
                    className={
                      openTab === 1 ? "flex flex-col items-center" : "hidden"
                    }
                    id="link1"
                  >
                    <div className="relative mx-auto py-3 px-4 rounded-lg sm:w-3/12 shadow bg-white ">
                      <svg
                        className="w-5 h-5 absolute text-gray-500 left-4 top-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        className="pl-6 focus:outline-none w-full bg-transparent text-gray-900"
                        value={findKey}
                        placeholder="Rechercher ..."
                        onChange={(event) => setFindKey(event.target.value)}
                      />
                    </div>
                    <div className="w-full py-4">
                      <h2 className="text-center text-white text-lg">
                        {" "}
                        Liste des Equipements
                      </h2>
                      <div className=" flex items-center space-x-4 text-white">
                        <button
                          className="bg-green-600 p-2 rounded-lg mb-2"
                          onClick={() => {
                            history.push(`/add-equipment/${idComite}`);
                          }}
                        >
                          Ajouter Equipement
                        </button>
                      </div>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="uppercase bg-gray-300">
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              N°
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              Date Réception
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              Type d'équipement
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-light">
                              Statut
                            </th>
                            <th className="py-4 px-2  border-grey-light">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {search(equipements)
                            .slice(
                              currentPage * nombrePerPage - nombrePerPage,
                              currentPage * nombrePerPage
                            )
                            .map((row) => (
                              <tr
                                className="text-center  hover:bg-gray-100 "
                                key={row.id}
                              >
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {i++}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.dateReception}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.typeEquipement}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {
                                    row.statutEquipement
                                    // <a
                                    //   download={row.name}
                                    //   href={`data:application/pdf;base64,${row.photoPresidente}`}
                                    // >
                                    //   <img
                                    //     class=" object-fill w-20 h-10"
                                    //     src={`data:application/pdf;base64,${row.photoPresidente}`}
                                    //     alt="doc"
                                    //   />
                                    // </a>
                                  }
                                </td>
                                <td className=" flex justify-center items-center space-x-5 py-4 px-2 border-b border-grey-light">
                                  <svg
                                    onClick={() => {
                                      console.log(row.id);
                                      //   history.push(`/comite-show/${row.id}`);
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  {row.statutEquipement === "EN MARCHE" ? (
                                    <button
                                      className="text-red-600 p-2 bg-orange-100 rounded-lg mb-2"
                                      onClick={() => {
                                        openModalDeclarePanne(row);
                                        setShowModalDeclarePanne(true);
                                      }}
                                    >
                                      Déclarer Panne
                                    </button>
                                  ) : (
                                    <button
                                      className="text-red-600  bg-green-100 p-2 rounded-lg mb-2"
                                      onClick={() => {
                                        openModalCloturePanne(row);
                                        setShowModalCloturePanne(true);
                                      }}
                                    >
                                      Clôturer Panne
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      nombreTotal={search(equipements).length}
                      nombrePerPage={nombrePerPage}
                      paginate={paginate}
                    />
                    {showModalDeclarePanne ? (
                      <>
                        <div
                          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          // onClick={() => setShowModal(false)}
                        >
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <form
                              onSubmit={handleSubmit(onSubmit1)}
                              className=""
                            >
                              {/*content*/}
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                  <h3 className="text-3xl font-semibold">
                                    Déclaration Panne
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() =>
                                      setShowModalDeclarePanne(false)
                                    }
                                  >
                                    {/* <span className="bg-transparent text-red-600  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                  ×
                                                </span> */}
                                  </button>
                                </div>
                                {/*body*/}
                                <div className="relative  flex-auto">
                                  <div className="text-gray-600 text-lg leading-relaxed p-10">
                                    <div className="flex flex-col space-y-2 items-start p-10">
                                      <div>
                                        <label>Date de Déclaration</label>

                                        <input
                                          className=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                                          ref={register}
                                          type="date"
                                          name="dateDeclaration"
                                        />
                                        {errors.dateDeclaration && (
                                          <span class="text-sm font-bold text-red-600 ">
                                            Date invalide
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <label> Type de Panne: </label>
                                        <select
                                          className="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                                          ref={register}
                                          type="text"
                                          name="typePanne"
                                        >
                                          <option value="STMP">STMP</option>
                                          <option value="POP">POP</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{
                                      transition: "all .15s ease",
                                    }}
                                    onClick={() =>
                                      setShowModalDeclarePanne(false)
                                    }
                                  >
                                    Fermer
                                  </button>
                                  <button
                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    style={{
                                      transition: "all .15s ease",
                                    }}
                                    // onClick={() => setShowModal(false)}
                                  >
                                    Valider
                                  </button>
                                </div>
                                <p className="text-center font-semibold text-orange-300">
                                  {message}
                                </p>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                    {showModalCloturePanne ? (
                      <>
                        <div
                          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          // onClick={() => setShowModal(false)}
                        >
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <form
                              onSubmit={handleSubmit(onSubmit2)}
                              className=""
                            >
                              {/*content*/}
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                  <h3 className="text-3xl font-semibold">
                                    Clôture Panne
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() =>
                                      setShowModalCloturePanne(false)
                                    }
                                  >
                                    {/* <span className="bg-transparent text-red-600  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                  ×
                                                </span> */}
                                  </button>
                                </div>
                                {/*body*/}
                                <div className="relative  flex-auto">
                                  <div className="text-gray-600 text-lg leading-relaxed p-10">
                                    <div className="flex flex-col space-y-2 items-start p-10">
                                      <div>
                                        <label>Date de Clôture</label>

                                        <input
                                          className=" text-gray-900 py-2 rounded px-4 w-full focus:outline-none focus:border-green-400  border-2"
                                          ref={register}
                                          type="date"
                                          name="dateCloture"
                                        />
                                        {errors.dateCloture && (
                                          <span class="text-sm font-bold text-red-600 ">
                                            Date invalide
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <label> Type de Panne: </label>
                                        <select
                                          className="text-gray-900 py-2 rounded px-4  w-full  focus:outline-none focus:border-green-400 border-2"
                                          ref={register}
                                          type="text"
                                          name="typePanne"
                                        >
                                          <option value="STMP">STMP</option>
                                          <option value="POP">POP</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{
                                      transition: "all .15s ease",
                                    }}
                                    onClick={() =>
                                      setShowModalCloturePanne(false)
                                    }
                                  >
                                    Fermer
                                  </button>
                                  <button
                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    style={{
                                      transition: "all .15s ease",
                                    }}
                                    // onClick={() => setShowModal(false)}
                                  >
                                    Valider
                                  </button>
                                </div>
                                <p className="text-center font-semibold text-orange-300">
                                  {message}
                                </p>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                  <div
                    className={
                      openTab === 2 ? "flex flex-col items-center" : "hidden"
                    }
                    id="link2"
                  >
                    <div className="relative mx-auto py-3 px-4 rounded-lg sm:w-3/12 shadow bg-white ">
                      <svg
                        className="w-5 h-5 absolute text-gray-500 left-4 top-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        className="pl-6 focus:outline-none w-full bg-transparent text-gray-900"
                        value={findKey}
                        placeholder="Rechercher ..."
                        onChange={(event) => setFindKey(event.target.value)}
                      />
                    </div>
                    <div className="w-full py-4">
                      <h2 className="text-center text-white text-lg">
                        {" "}
                        Les Pannes
                      </h2>
                      <div className=" flex items-center space-x-4 text-white">
                        {/* <button
                          className="bg-green-600 p-2 rounded-lg mb-2"
                          onClick={() => {
                            history.push(`/add-equipment/${idComite}`);
                          }}
                        >
                          Ajouter Equipement
                        </button> */}
                      </div>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="uppercase bg-gray-300">
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              N°
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              Date Déclaration
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              Type d'équipement
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-light">
                              Statut
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-light">
                              Type de Panne
                            </th>

                            <th className="py-4 px-2  border-grey-light">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {search(pannes)
                            .slice(
                              currentPage * nombrePerPage - nombrePerPage,
                              currentPage * nombrePerPage
                            )
                            .map((row) => (
                              <tr
                                className="text-center  hover:bg-gray-100 "
                                key={row.id}
                              >
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {j++}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.dateDeclaration}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.typeEquipement}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {
                                    row.statutEquipement
                                    // <a
                                    //   download={row.name}
                                    //   href={`data:application/pdf;base64,${row.photoPresidente}`}
                                    // >
                                    //   <img
                                    //     class=" object-fill w-20 h-10"
                                    //     src={`data:application/pdf;base64,${row.photoPresidente}`}
                                    //     alt="doc"
                                    //   />
                                    // </a>
                                  }
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.typePanne}
                                </td>
                                <td className=" flex justify-center items-center space-x-5 py-4 px-2 border-b border-grey-light">
                                  <svg
                                    onClick={() => {
                                      console.log(row.id);
                                      //   history.push(`/comite-show/${row.id}`);
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  {/* {row.statutEquipement === "EN MARCHE" ? (
                                    <button
                                      className="text-red-600 p-2 bg-orange-100 rounded-lg mb-2"
                                      onClick={() => {
                                        openModalDeclarePanne(row.id);
                                        setShowModalDeclarePanne(true);
                                      }}
                                    >
                                      Déclarer Panne
                                    </button>
                                  ) : (
                                    <button
                                      className="text-red-600  bg-green-100 p-2 rounded-lg mb-2"
                                      onClick={() => {
                                        openModalCloturePanne(row.id);
                                        setShowModalCloturePanne(true);
                                      }}
                                    >
                                      Clôturer Panne
                                    </button>
                                  )} */}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      nombreTotal={search(pannes).length}
                      nombrePerPage={nombrePerPage}
                      paginate={paginate}
                    />
                  </div>

                  <div
                    className={
                      openTab === 3 ? "flex flex-col items-center" : "hidden"
                    }
                    id="link3"
                  >
                    <div className="relative mx-auto py-3 px-4 rounded-lg sm:w-3/12 shadow bg-white ">
                      <svg
                        className="w-5 h-5 absolute text-gray-500 left-4 top-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        className="pl-6 focus:outline-none w-full bg-transparent text-gray-900"
                        value={findKey}
                        placeholder="Rechercher ..."
                        onChange={(event) => setFindKey(event.target.value)}
                      />
                    </div>
                    <div className="w-full   py-4">
                      <h2 className="text-center text-white text-lg">
                        {" "}
                        Les Réparations
                      </h2>
                      <div className=" flex items-center space-x-4 text-white">
                        {/* <button
                          className="bg-green-600 p-2 rounded-lg mb-2"
                          onClick={() => {
                            history.push(`/add-equipment/${idComite}`);
                          }}
                        >
                          Ajouter Equipement
                        </button> */}
                      </div>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="uppercase bg-gray-300">
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              N°
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              Date de Clôture
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-800">
                              Type d'équipement
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-light">
                              Statut
                            </th>
                            <th className="py-4 px-2 border-r-2 border-grey-light">
                              Type de Panne
                            </th>

                            <th className="py-4 px-2  border-grey-light">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {search(reparations)
                            .slice(
                              currentPage * nombrePerPage - nombrePerPage,
                              currentPage * nombrePerPage
                            )
                            .map((row) => (
                              <tr
                                className="text-center  hover:bg-gray-100 "
                                key={row.id}
                              >
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {k++}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.dateCloture}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.typeEquipement}
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {
                                    row.statutEquipement
                                    // <a
                                    //   download={row.name}
                                    //   href={`data:application/pdf;base64,${row.photoPresidente}`}
                                    // >
                                    //   <img
                                    //     class=" object-fill w-20 h-10"
                                    //     src={`data:application/pdf;base64,${row.photoPresidente}`}
                                    //     alt="doc"
                                    //   />
                                    // </a>
                                  }
                                </td>
                                <td className="py-4 px-2 border-b border-grey-light">
                                  {row.typePanne}
                                </td>
                                <td className=" flex justify-center items-center space-x-5 py-4 px-2 border-b border-grey-light">
                                  <svg
                                    onClick={() => {
                                      console.log(row.id);
                                      //   history.push(`/comite-show/${row.id}`);
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  {/* {row.statutEquipement === "EN MARCHE" ? (
                                    <button
                                      className="text-red-600 p-2 bg-orange-100 rounded-lg mb-2"
                                      onClick={() => {
                                        openModalDeclarePanne(row.id);
                                        setShowModalDeclarePanne(true);
                                      }}
                                    >
                                      Déclarer Panne
                                    </button>
                                  ) : (
                                    <button
                                      className="text-red-600  bg-green-100 p-2 rounded-lg mb-2"
                                      onClick={() => {
                                        openModalCloturePanne(row.id);
                                        setShowModalCloturePanne(true);
                                      }}
                                    >
                                      Clôturer Panne
                                    </button>
                                  )} */}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      nombreTotal={search(reparations).length}
                      nombrePerPage={nombrePerPage}
                      paginate={paginate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Equipements;