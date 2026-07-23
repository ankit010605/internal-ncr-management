import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ============================================================
   SHARED CONFIG
   ============================================================ */

const BRAND_DARK = "1C1C1E";
const BRAND_DARK_RGB = [28, 28, 30];
const BRAND_AMBER = "C97B2E";
const BRAND_AMBER_RGB = [201, 123, 46];
const STATUS_OPEN_RGB = [201, 123, 46];   // amber
const STATUS_CLOSED_RGB = [46, 125, 87];  // green
const ROW_ALT_RGB = [245, 245, 246];      // light neutral grey

const COLUMNS = [
  { header: "NCR No", key: "ncr_number", width: 16 },
  { header: "Project", key: "project_name", width: 14 },
  { header: "Drawing No", key: "drawing_number", width: 14 },
  { header: "MAK No", key: "mak_number", width: 12 },
  { header: "Department", key: "department", width: 14 },
  { header: "Qty", key: "quantity", width: 8 },
  { header: "Plant", key: "plant", width: 10 },
  { header: "Bay", key: "bay", width: 10 },
  { header: "Stage", key: "stage", width: 12 },
  { header: "Contractor", key: "contractor", width: 14 },
  { header: "Responsible", key: "responsible_person", width: 14 },
  { header: "Status", key: "status", width: 12 },
  { header: "Issue Date", key: "issue_date", width: 13 },
  { header: "Closed By", key: "closed_by", width: 13 },
  { header: "Root Cause Analysis", key: "root_cause_analysis", width: 38 },
  { header: "Corrective & Preventive Action", key: "corrective_preventive_action", width: 42 },
];

const fmtDate = (d) => (d ? d : "-");

/* ============================================================
   EXCEL EXPORT
   ============================================================ */

export const exportToExcel = async (rows) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "JSPL - Welding & Quality Division";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("NCR Reports", {
    views: [{ state: "frozen", ySplit: 4 }],
    pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1 },
  });

  // ---- Title block ----
  sheet.mergeCells(1, 1, 1, COLUMNS.length);
  const titleCell = sheet.getCell(1, 1);
  titleCell.value = "Non-Conformance Report (NCR) Register";
  titleCell.font = { name: "Calibri", size: 16, bold: true, color: { argb: "FF" + BRAND_DARK } };
  titleCell.alignment = { vertical: "middle", horizontal: "left" };
  sheet.getRow(1).height = 26;

  sheet.mergeCells(2, 1, 2, COLUMNS.length);
  const subtitleCell = sheet.getCell(2, 1);
  subtitleCell.value = `JSPL SSD Plant · Punjipathra, Raigarh  |  Generated: ${new Date().toLocaleString("en-IN")}  |  Total Records: ${rows.length}`;
  subtitleCell.font = { name: "Calibri", size: 10, italic: true, color: { argb: "FF666666" } };
  sheet.getRow(2).height = 16;

  sheet.getRow(3).height = 6; // spacer

  // ---- Header row ----
  const headerRowIndex = 4;
  const headerRow = sheet.getRow(headerRowIndex);
  COLUMNS.forEach((col, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = col.header;
    cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + BRAND_DARK } };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: "FF999999" } },
      bottom: { style: "thin", color: { argb: "FF999999" } },
      left: { style: "thin", color: { argb: "FF999999" } },
      right: { style: "thin", color: { argb: "FF999999" } },
    };
  });
  headerRow.height = 28;

  // ---- Column widths ----
  COLUMNS.forEach((col, i) => {
    sheet.getColumn(i + 1).width = col.width;
  });

  // ---- Data rows ----
  rows.forEach((row, rIdx) => {
    const excelRow = sheet.getRow(headerRowIndex + 1 + rIdx);
    COLUMNS.forEach((col, cIdx) => {
      const cell = excelRow.getCell(cIdx + 1);
      let value = row[col.key];
      if (col.key === "issue_date") {
        value = fmtDate(value);
      }
      cell.value = value === null || value === undefined || value === "" ? "-" : value;
      cell.font = { name: "Calibri", size: 10, color: { argb: "FF1F1F1F" } };
      cell.alignment = {
        vertical: "top",
        horizontal: ["quantity", "plant", "bay", "status"].includes(col.key) ? "center" : "left",
        wrapText: true,
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE0E0E0" } },
        bottom: { style: "thin", color: { argb: "FFE0E0E0" } },
        left: { style: "thin", color: { argb: "FFE0E0E0" } },
        right: { style: "thin", color: { argb: "FFE0E0E0" } },
      };

      // Zebra striping
      if (rIdx % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + toARGB(ROW_ALT_RGB) } };
      }

      // Status badge coloring
      if (col.key === "status") {
        const isClosed = String(row.status).toLowerCase() === "closed";
        cell.font = {
          name: "Calibri",
          size: 10,
          bold: true,
          color: { argb: isClosed ? "FFFFFFFF" : "FF1C1C1E" },
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF" + toARGB(isClosed ? STATUS_CLOSED_RGB : STATUS_OPEN_RGB) },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      }
    });
    excelRow.height = 30;
  });

  // ---- Auto filter ----
  sheet.autoFilter = {
    from: { row: headerRowIndex, column: 1 },
    to: { row: headerRowIndex, column: COLUMNS.length },
  };

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer], { type: "application/octet-stream" }), "NCR_Reports.xlsx");
};

function toARGB([r, g, b]) {
  return [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase();
}

/* ============================================================
   PDF EXPORT
   ============================================================ */

export const exportToPDF = (rows) => {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a3" });
  const pageWidth = doc.internal.pageSize.getWidth();

  const drawHeader = () => {
    // Navy title bar
    doc.setFillColor(...BRAND_DARK_RGB);
    doc.rect(0, 0, pageWidth, 46, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Non-Conformance Report (NCR) Register", 24, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("JSPL SSD Plant · Welding & Quality Division · Punjipathra, Raigarh", 24, 37);

    // Amber accent underline
    doc.setFillColor(...BRAND_AMBER_RGB);
    doc.rect(0, 46, pageWidth, 3, "F");

    // Meta line
    doc.setTextColor(90, 90, 90);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "italic");
    doc.text(
      `Generated: ${new Date().toLocaleString("en-IN")}   |   Total Records: ${rows.length}`,
      24,
      62
    );
  };

  drawHeader();

  const tableColumn = [
    "NCR No",
    "Project",
    "Drawing No",
    "MAK No",
    "Department",
    "Qty",
    "Plant",
    "Bay",
    "Stage",
    "Contractor",
    "Responsible",
    "Status",
    "Issue Date",
    "Closed By",
    "Root Cause Analysis",
    "Corrective & Preventive Action",
  ];

  const statusColIndex = 11;

  const tableRows = rows.map((row) => [
    row.ncr_number || "-",
    row.project_name || "-",
    row.drawing_number || "-",
    row.mak_number || "-",
    row.department || "-",
    row.quantity ?? "-",
    row.plant || "-",
    row.bay || "-",
    row.stage || "-",
    row.contractor || "-",
    row.responsible_person || "-",
    row.status || "-",
    row.issue_date || "-",
    row.closed_by || "-",
    row.root_cause_analysis || "-",
    row.corrective_preventive_action || "-",
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 76,
    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 5,
      overflow: "linebreak",
      valign: "middle",
      lineColor: [225, 225, 225],
      lineWidth: 0.5,
      textColor: [40, 40, 40],
    },

    headStyles: {
      fillColor: BRAND_DARK_RGB,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8.5,
      halign: "center",
      valign: "middle",
      lineWidth: 0,
    },

    alternateRowStyles: {
      fillColor: ROW_ALT_RGB,
    },

    bodyStyles: {
      valign: "top",
    },

    columnStyles: {
      0: { cellWidth: 62, fontStyle: "bold", halign: "center" }, // NCR No
      5: { cellWidth: 30, halign: "center" },                     // Qty
      6: { cellWidth: 40, halign: "center" },                     // Plant
      7: { cellWidth: 36, halign: "center" },                     // Bay
      11: { cellWidth: 48, halign: "center", fontStyle: "bold" }, // Status
      14: { cellWidth: 150 }, // RCA
      15: { cellWidth: 165 }, // CAPA
    },

    margin: { left: 24, right: 24, top: 76, bottom: 34 },

    // Color-code status cells + zebra header repeat on new pages
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === statusColIndex) {
        const val = String(data.cell.raw).toLowerCase();
        const isClosed = val === "closed";
        data.cell.styles.fillColor = isClosed ? STATUS_CLOSED_RGB : STATUS_OPEN_RGB;
        data.cell.styles.textColor = isClosed ? [255, 255, 255] : [28, 28, 30];
      }
    },

    didDrawPage: () => {
      if (doc.internal.getCurrentPageInfo().pageNumber > 1) {
        drawHeader();
      }
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      const pageSize = doc.internal.pageSize;
      const pageH = pageSize.getHeight();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
        pageWidth - 24,
        pageH - 14,
        { align: "right" }
      );
      doc.text("Confidential — Internal Quality Document", 24, pageH - 14);
    },
  });

  doc.save("NCR_Reports.pdf");
};