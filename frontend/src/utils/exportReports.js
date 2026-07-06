import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

// -------------------- EXCEL EXPORT --------------------
export const exportToExcel = (rows) => {

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "NCR Reports");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(data, "NCR_Reports.xlsx");
};

// -------------------- PDF EXPORT --------------------
export const exportToPDF = (rows) => {

    // 📍 STEP 1: create PDF document
    const doc = new jsPDF();
  
    // 📍 STEP 2: table headers
    const tableColumn = [
      "NCR No",
      "Project",
      "Plant",
      "Bay",
      "Contractor",
      "Status",
      "Issue Date",
    ];
  
    // 📍 STEP 3: table data
    const tableRows = rows.map((row) => [
      row.ncr_number,
      row.project_name,
      row.plant,
      row.bay,
      row.contractor,
      row.status,
      row.issue_date,
    ]);
  
    // 📍 STEP 4: title
    doc.text("NCR Reports", 14, 15);
  
    // 📍 STEP 5: FIXED autoTable usage (IMPORTANT)
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    // 📍 STEP 6: download file
    doc.save("NCR_Reports.pdf");
  };