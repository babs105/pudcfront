import React, { useEffect, useState } from "react";

import { comiteService } from "../../service/comiteService";

import { useHistory } from "react-router-dom";
import Pagination from "../DataTable/Pagination";

function ComiteList() {
  const [comite, setComite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nombrePerPage, setNombrePerPage] = useState(5);
  const [findKey, setFindKey] = useState("");
  let history = useHistory();

  useEffect(() => {
    // getListComite();
    setLoading(true);
    comiteService.getAllComite().then((res) => {
      setLoading(false);
      setComite(res);
    });
  }, []);

  const getListComite = () => {
    // setLoading(true);
    // comiteService.getAllComite().then((res) => {
    //   setLoading(false);
    //   setComite(res);
    // });
  };

  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.nomComite.toString().toLowerCase().indexOf(findKey.toLowerCase()) >
        -1
      //   ||
      // row.kilometrage
      //   .toString()
      //   .toLowerCase()
      //   .indexOf(findKey.toLowerCase()) > -1
    );

    // const columns = rows[0] && Object.keys(rows[0]);
    // console.log(columns);
    // return rows.filter((row) =>
    //   columns.some(
    //     (column) =>
    //       row[column].toString().toLowerCase().indexOf(findKey.toLowerCase()) >
    //       -1
    //   )
    // );
  };
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
  const imprimer = () => {
    window.print();
  };
  let i = 1;
  return (
    <div className="flex flex-col items-center space-y-4 justify-start h-screen font-quicksand text-white bg-gray-800 antialiased  justify-items-center p-5">
      <div className="relative py-3 px-4 rounded-lg sm:w-4/12 shadow bg-white ">
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

      <h2 className="text-center text-white text-lg"> Liste des Comités</h2>
      <div className="flex w-full justify-start text-white">
        <button
          className="bg-green-600 p-2 rounded-lg mb-2"
          onClick={() => {
            history.push("/comite");
          }}
        >
          Ajouter Comité
        </button>
      </div>
      {loading ? (
        <div
          className=" text-green-600 text-xl bg-gray-50   flex flex-row justify-center items-center 
                 rounded-lg py-3 px-12 focus:outline-none"
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 "
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
          Chargement...
        </div>
      ) : (
        <div class=" overflow-x-auto w-full ">
          <div class="align-middle inline-block min-w-full ">
            <div class="overflow-hidden w-full">
              <table className="table-auto rounded-lg shadow min-w-full text-gray-900 border-collapse">
                <thead>
                  <tr className="uppercase  bg-gray-300">
                    <th className="py-4 px-2 border-r-2 border-grey-800">N°</th>
                    <th className=" py-4 px-2 border-r-2 border-grey-800  ">
                      Dénomination
                    </th>
                    <th className="py-4 px-2 border-r-2 border-grey-800  ">
                      Date Assemblee Constitutive
                    </th>
                    <th className="py-4 px-2 border-r-2 border-grey-light ">
                      Région
                    </th>
                    <th className="py-4 px-2  border-grey-light">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {search(comite)
                    .slice(
                      currentPage * nombrePerPage - nombrePerPage,
                      currentPage * nombrePerPage
                    )
                    .map((row) => (
                      <tr
                        className="text-center   hover:bg-gray-100 "
                        key={row.id}
                      >
                        <td className="py-4 px-2 border-b border-grey-light">
                          {i++}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {row.nomComite}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light ">
                          {row.dateAssembleeConstitutive}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light ">
                          {row.region}
                        </td>
                        <td className="  py-4 px-2 border-b border-grey-light">
                          <div className=" flex justify-around items-center">
                            <svg
                              onClick={() => {
                                console.log(row.id);
                                history.push(`/comite-show/${row.id}`);
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
                            <svg
                              onClick={() => {
                                console.log(row.id);
                                history.push(`/comite-edit/${row.id}`);
                              }}
                              className="w-5 h-5 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Pagination
        nombreTotal={search(comite).length}
        nombrePerPage={nombrePerPage}
        paginate={paginate}
      />
    </div>
  );
}

export default ComiteList;
