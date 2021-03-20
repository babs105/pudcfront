import React, { useEffect, useState } from "react";
import { comiteService } from "../../service/comiteService";
import { Link, useHistory } from "react-router-dom";
import generatePDF from "../GeneratePdf/GeneratePdf";

function ComiteDetails({ match }) {
  const [comite, setcomite] = useState({});
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
      })
      .catch((e) => console.log(e));
  };
  let history = useHistory();
  let i = 1,
    j = 1;
  let color = "green";
  return (
    <>
      <div className="bg-gray-800 flex flex-col justify-center items-center space-y-14 text-white p-4  font-quicksand w-full">
        <div className="w-10/12 flex flex-col justify-start items-stretch sm:flex-row sm:justify-between sm:items-center ">
          <ul>
            <li>Comité : {comite.nomComite}</li>
            <li>Numero Récipissé : {comite.numRecepisse}</li>
            <li>Nombre d'équipement: {comite.nbreEquipement}</li>
            <li>Région : {comite.region}</li>
            <li>Département : {comite.departement}</li>
            <li>Commune : {comite.commune}</li>
          </ul>

          <img
            class="object-fill w-40 h-40"
            src={`data:**/*;base64,${comite.photoPresidente}`}
            alt="presidente"
          />
          <ul>
            <li>Village/Quartier : {comite.quartierVillage}</li>
            <li>Nom du Chef de Village: {comite.nomChefVillage}</li>
            <li>Téléphone : {comite.telChefVillage}</li>
            <li>Date Assemblée D'information : {comite.dateAssembleeInfo}</li>
            <li>
              Date Assemblée Constitutive :{comite.dateAssembleeConstitutive}
            </li>
          </ul>
        </div>

        <div className="  w-10/12  rounded-2xl sm:bg-gray-300 p-2  flex flex-col space-y-2  sm:flex-row  justify-between ">
          <button
            className="py-2 px-2 sm:py-0 bg-green-500  rounded-lg focus:outline-none"
            onClick={() => {
              console.log(comite.nomComite);
              let comiteParam = {
                idComite: idComite,
                nomComite: comite.nomComite,
              };
              history.push(`/equipement/${JSON.stringify(comiteParam)}`);
            }}
          >
            Equipements
          </button>
          <button
            className=" p-2 bg-green-500  rounded-lg focus:outline-none"
            onClick={() => {
              console.log(comite.nomComite);
              let comiteParam = {
                idComite: idComite,
                nomComite: comite.nomComite,
              };
              history.push(`/formation/${JSON.stringify(comiteParam)}`);
            }}
          >
            Formations
          </button>
          <button
            className=" p-2 bg-green-500  rounded-lg focus:outline-none"
            onClick={() => generatePDF(comite)}
          >
            Générer PDF
          </button>
        </div>

        <div className=" w-10/12 flex flex-col items-center justify-center ">
          <h2 className="">Liste des Membres du Bureau</h2>
          <div class=" overflow-x-auto w-full -my-2  ">
            <div class="py-2 align-middle inline-block min-w-full ">
              <div class="overflow-hidden  w-full">
                <table className="w-full text-black  rounded-lg shadow mx-auto  border-collapse">
                  <thead>
                    <tr className="uppercase bg-gray-300">
                      <th className="py-4 px-2 border-r-2 border-grey-800">
                        N°
                      </th>
                      <th className="py-4 px-2 border-r-2 border-grey-800">
                        Prenom
                      </th>
                      <th className="py-4 px-2 border-r-2 border-grey-800">
                        Nom
                      </th>
                      <th className="py-4 px-2  border-grey-light">Poste</th>
                      {/* <th className="py-4 px-2  border-grey-light">Action</th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {comite.membres?.map((row) => (
                      <tr className="text-center  " key={row.id}>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {i++}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {row.prenom}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {row.nom}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {
                            row.poste
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-10/12 flex flex-col items-center justify-center ">
          <h2 className="">Liste des membres du Comité Directeur</h2>
          <div class=" overflow-x-auto w-full -my-2  ">
            <div class="py-2 align-middle inline-block min-w-full ">
              <div class="overflow-hidden  w-full">
                <table className="w-full text-black rounded-lg shadow mx-auto  border-collapse">
                  <thead>
                    <tr className="uppercase bg-gray-300">
                      <th className="py-4 px-2 border-r-2 border-grey-800">
                        N°
                      </th>
                      <th className="py-4 px-2 border-r-2 border-grey-800">
                        Prenom
                      </th>
                      <th className="py-4 px-2 border-r-2 border-grey-800">
                        Nom
                      </th>
                      <th className="py-4 px-2 border-r-2 border-grey-800">
                        Tel
                      </th>
                      <th className="py-4 px-2  border-grey-light">
                        Profession
                      </th>
                      {/* <th className="py-4 px-2  border-grey-light">Action</th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {comite.listePresence?.map((row) => (
                      <tr className="text-center   " key={row.id}>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {j++}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {row.prenom}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {row.nom}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {row?.tel}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {
                            row.profession
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComiteDetails;
