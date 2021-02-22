import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (comite) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumnMembres = ["N°", "PRENOM", "NOM", "POSTE"];
  // define an empty array of rows
  const tableRowsMembres = [];

  const tableColumnPresence = ["N°", "PRENOM", "NOM", "TEL", "PROFESSION"];
  //   // define an empty array of rows
  const tableRowsPresence = [];
  let i = 1,
    j = 1;
  // for each ticket pass all its data into an array
  comite.membres.forEach((membre) => {
    const membresData = [
      i++,
      membre.prenom,
      membre.nom,
      membre.poste,
      // called date-fns to format the date on the ticket
      //   format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRowsMembres.push(membresData);
  });

  comite.listePresence.forEach((present) => {
    const presenceData = [
      j++,
      present.prenom,
      present.nom,
      present.tel,
      present.profession,

      // called date-fns to format the date on the ticket
      //   format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRowsPresence.push(presenceData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumnMembres, tableRowsMembres, { startY: 90 });

  //   const date = Date().split(" ");
  // we use a date string to generate our filename.
  //   const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  // ticket title. and margin-top + margin-left
  doc.setFontSize(12);
  doc.setLineCap(2);
  doc.text(`Nom Comité : ${comite.nomComite}`, 14, 15);
  doc.text(`Date Création  : ${comite.dateCreation}`, 14, 20);
  doc.text(`Région : ${comite.region}`, 14, 25);
  doc.text(`Département : ${comite.departement}`, 14, 30);
  doc.text(`Commune : ${comite.commune}`, 14, 35);
  doc.text(`Numéro Recépissé : ${comite.numRecepisse}`, 14, 40);
  doc.text(`Mission d'information 1 :${comite.dateMissionInfo1}`, 14, 45);
  doc.text(`Lieu: ${comite.lieuMissionInfo1}`, 14, 50);
  doc.text(`Mission d'information 2 : ${comite.dateMissionInfo2}`, 14, 55);
  doc.text(`Lieu : ${comite.lieuMissionInfo2}`, 14, 60);
  doc.text(`Assemblée d'information 1 : ${comite.dateAssembleeInfo1}`, 14, 65);
  doc.text(`Lieu : ${comite.lieuAssembleeInfo1}`, 14, 70);
  doc.addImage(`data:**/*;base64,${comite.photoPresidente}`, 145, 15, 50, 50);
  doc.text(` Présidente`, 160, 70);
  doc.text(
    ` ASSEMBLEE CONSTITUTIVE : ${comite.dateAssembleeConstitutive}`,
    50,
    80
  );

  doc.text(`Liste des membres`, 80, 88);
  doc.addPage(); // this code creates new page in pdf document
  doc.text(`Liste de Présence`, 80, 15);
  doc.autoTable(tableColumnPresence, tableRowsPresence, { startY: 20 });

  //   doc.text("Closed tickets within the last one month.", 14, 45);
  // we define the name of our PDF file.
  doc.save(`Comite_${comite.nomComite}.pdf`);
};

export default generatePDF;
