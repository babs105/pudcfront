import React, { useEffect, useState } from "react";
import { comiteService } from "../../service/comiteService";
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
  let i = 1,
    j = 1;
  return (
    <>
      <div className="bg-gray-800  text flex flex-col space-y-14 text-white  font-quicksand w-full">
        <div className=" py-7  w-10/12  mx-auto flex justify-between">
          <ul>
            <li>Nom Comité : {comite.nomComite}</li>
            <li>Date de Création : {comite.dateCreation}</li>
            <li>REGION : {comite.region}</li>
            <li>DEPARTEMENT : {comite.departement}</li>
            <li>COMMUNE : {comite.commune}</li>
            <li>NUMERO RECEPISSE : {comite.numRecepisse}</li>
          </ul>
          <div>
            <img
              class=" object-fill w-40 h-40"
              src={`data:**/*;base64,${comite.photoPresidente}`}
              alt="presidente"
            />
            <h2>Présidente</h2>
          </div>
          <ul>
            <li>DATE MISSION D'INFORMATION 1 : {comite.dateMissionInfo1}</li>
            <li>LIEU MISSION D'INFORMATION 1 : {comite.lieuMissionInfo1}</li>
            <li>DATE MISSION D'INFORMATION 2 : {comite.dateMissionInfo2}</li>
            <li>LIEU MISSION D'INFORMATION 2 :{comite.lieuMissionInfo2}</li>
            <li>
              DATE ASSEMBLEE D'INFORMATION 1 : {comite.dateAssembleeInfo1}
            </li>
            <li>DATE ASSEMBLEE D'INFORMATION 1 {comite.lieuAssembleeInfo1}</li>
          </ul>
        </div>
        <h2 className="w-1/4 mx-auto">
          DATE ASSEMBLEE CONSTITUTIVE : {comite.dateAssembleeConstitutive}
        </h2>

        <div>
          <h2 className=" w-1/4  text-center   mx-auto">Liste des Membres</h2>

          <table className="table-auto  text-black  rounded-lg shadow mx-auto w-10/12 border-collapse">
            <thead>
              <tr className="uppercase bg-gray-300">
                <th className="py-4 px-2 border-r-2 border-grey-800">N°</th>
                <th className="py-4 px-2 border-r-2 border-grey-800">Prenom</th>
                <th className="py-4 px-2 border-r-2 border-grey-800">Nom</th>
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

        <div>
          <h2 className=" w-1/4 text-center   mx-auto">Liste de Présence</h2>
          <table className="table-auto  text-black rounded-lg shadow mx-auto w-10/12 border-collapse">
            <thead>
              <tr className="uppercase bg-gray-300">
                <th className="py-4 px-2 border-r-2 border-grey-800">N°</th>
                <th className="py-4 px-2 border-r-2 border-grey-800">Prenom</th>
                <th className="py-4 px-2 border-r-2 border-grey-800">Nom</th>
                <th className="py-4 px-2 border-r-2 border-grey-800">Tel</th>
                <th className="py-4 px-2  border-grey-light">Profession</th>
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

        <button
          className=" p-2 mx-auto bg-green-500 w-1/12 rounded-lg focus:outline-none"
          onClick={() => generatePDF(comite)}
        >
          Générer PDF
        </button>
      </div>
    </>
  );
}

export default ComiteDetails;
