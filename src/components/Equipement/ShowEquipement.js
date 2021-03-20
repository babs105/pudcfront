import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import generatePDF from "../GeneratePdf/GeneratePdf";
import { equipementService } from "../../service/equipementService";

function ShowEquipement({ match }) {
  const [equipement, setEquipement] = useState({});
  let idequipement = match.params.id;

  useEffect(() => {
    getEquipementById(idequipement);
  }, []);

  const getEquipementById = (id) => {
    equipementService
      .getEquipmentById(id)
      .then((res) => {
        console.log(res);
        setEquipement(res);
      })
      .catch((e) => console.log(e));
  };
  let history = useHistory();
  let i = 1;

  return (
    <>
      <div className="bg-gray-800 flex flex-col items-center space-y-14 h-screen text-white p-4 font-quicksand w-full">
        <div className="w-10/12 flex flex-col justify-start items-stretch sm:flex-row sm:justify-between sm:items-center ">
          <img
            class="object-fill w-40 h-40"
            src={`data:**/*;base64,${equipement.photoEntreposage}`}
            alt="Abrit"
          />

          <ul>
            <li>Comité : {equipement.nomComite}</li>
            <li>Code Equipement : {equipement.nameEquipement}</li>
            <li>Date Réception: {equipement.dateReception}</li>
            <li>Type Equipement : {equipement.typeEquipement}</li>
            <li>Statut Equipement : {equipement.statutEquipement}</li>
          </ul>
        </div>

        <div className=" w-10/12 flex flex-col items-center justify-center ">
          <h2 className="mb-4">Liste des Villages Polarisés</h2>
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
                        Village
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {equipement.villagePolarise?.map((row) => (
                      <tr className="text-center  " key={row.id}>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {i++}
                        </td>
                        <td className="py-4 px-2 border-b border-grey-light">
                          {row.villageName}
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

export default ShowEquipement;
