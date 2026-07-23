import jsPDF from "jspdf";

const NCR_LOGO_BASE64 = "data:image/png;base64,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";

const getBase64FromUrl = async (url) => {
  const response = await fetch(url);

  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);

    reader.readAsDataURL(blob);
  });
};
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-GB");
};

export const exportNCRDetailPDF = async (ncr) => {

  const doc = new jsPDF();

  // ==========================
  // LAYOUT CONSTANTS / THEME
  // ==========================

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 10;
  const contentWidth = pageWidth - marginX * 2;

  const colorPrimary = [21, 61, 92];
  const colorPrimaryLight = [230, 236, 241];
  const colorBorder = [180, 180, 180];
  const colorTextMuted = [90, 90, 90];
  const colorTextDark = [30, 30, 30];
  const colorErrorText = [180, 40, 40];
  const colorAccent = [176, 34, 40];

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - 25) {
      doc.addPage();
      y = 20;
    }
  };

  // ==========================
  // HEADER
  // ==========================

  const drawHeader = () => {

    // Logo
    const logoW = 42;
    const logoH = (73 / 272) * logoW;

    try {
      doc.addImage(NCR_LOGO_BASE64, "PNG", marginX, 9, logoW, logoH);
    } catch (err) {
      doc.setDrawColor(...colorBorder);
      doc.setLineWidth(0.3);
      doc.rect(marginX, 9, logoW, logoH);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...colorTextMuted);
      doc.text("LOGO", marginX + logoW / 2, 9 + logoH / 2, { align: "center" });
    }

    // Form code (top right, small)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...colorTextMuted);
    doc.text("JSPL-SSD/MR/FORM/005A(R0)", pageWidth - marginX, 10, {
      align: "right",
    });

    // Title
    doc.setTextColor(...colorPrimary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("NON CONFORMITY REPORT", pageWidth / 2, 17, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...colorTextMuted);
    doc.text("NCR Detail Report", pageWidth / 2, 22.5, {
      align: "center",
    });

    // NCR number badge
    doc.setFillColor(...colorPrimary);
    doc.rect(pageWidth - marginX - 45, 13, 45, 16, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("NCR NO.", pageWidth - marginX - 42, 18);

    doc.setFontSize(12);
    doc.text(String(ncr.ncr_number || "-"), pageWidth - marginX - 42, 26);

    // Header rule
    doc.setDrawColor(...colorAccent);
    doc.setLineWidth(1);
    doc.line(marginX, 33, pageWidth - marginX, 33);
    doc.setDrawColor(...colorPrimary);
    doc.setLineWidth(0.3);
    doc.line(marginX, 34.2, pageWidth - marginX, 34.2);

    doc.setTextColor(0, 0, 0);
  };

  drawHeader();

  let y = 41;

  // ==========================
  // INFO GRID (3 columns)
  // ==========================

  const fields = [
    ["NCR Number", ncr.ncr_number],
    ["Project", ncr.project_name],
    ["Drawing Number", ncr.drawing_number],
  
    ["MAK Number", ncr.mak_number],
    ["Quantity (Tons)", ncr.quantity],
    ["Department", ncr.department],
  
    ["Plant", ncr.plant],
    ["Bay", ncr.bay],
    ["Stage", ncr.stage],
  
    ["Status", ncr.status],
    ["Issue Date", formatDate(ncr.issue_date)],
// ["Target Closing", formatDate(ncr.target_closing_date)],
  
    ["Initiator", ncr.initiator_name],
    ["Initiator Email", ncr.initiator_email],
    ["Responsible Person", ncr.responsible_person],
  
    ["Responsible Email", ncr.responsible_email],
    ["Contractor", ncr.contractor],
    ["Closed By", ncr.closed_by || "-"],
    // ["Closed Date", formatDate(ncr.closed_date)],
  ];

  const gridCols = 3;
  const colWidth = contentWidth / gridCols;
  const labelHeight = 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  for (let i = 0; i < fields.length; i += gridCols) {
    const rowFields = fields.slice(i, i + gridCols);

    const lineSets = rowFields.map(([, value]) =>
      doc.splitTextToSize(String(value || "-"), colWidth - 6)
    );
    const maxLines = Math.max(...lineSets.map((l) => l.length));
    const cellHeight = Math.max(14, labelHeight + 5 + maxLines * 4.3);

    ensureSpace(cellHeight);

    rowFields.forEach(([label], idx) => {
      const x = marginX + idx * colWidth;
      const lines = lineSets[idx];

      doc.setDrawColor(...colorBorder);
      doc.setLineWidth(0.2);
      doc.rect(x, y, colWidth, cellHeight);

      doc.setFillColor(...colorPrimaryLight);
      doc.rect(x, y, colWidth, labelHeight, "F");
      doc.setDrawColor(...colorBorder);
      doc.rect(x, y, colWidth, labelHeight);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...colorPrimary);
      doc.text(String(label).toUpperCase(), x + 2.5, y + 3.6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...colorTextDark);
      doc.text(lines, x + 2.5, y + labelHeight + 5);
    });

    y += cellHeight;
  }

  y += 8;

  // ==========================
  // TEXT SECTIONS
  // ==========================

  const drawTextSection = (title, content) => {

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const lines = doc.splitTextToSize(String(content || "-"), contentWidth - 8);
    const boxHeight = Math.max(16, lines.length * 5.5 + 12);

    ensureSpace(boxHeight + 6);

    doc.setFillColor(...colorPrimary);
    doc.rect(marginX, y, contentWidth, 7, "F");
    doc.setFillColor(...colorAccent);
    doc.rect(marginX, y, 2, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(title, marginX + 5, y + 5);

    doc.setDrawColor(...colorBorder);
    doc.setLineWidth(0.2);
    doc.rect(marginX, y + 7, contentWidth, boxHeight - 7);

    doc.setTextColor(...colorTextDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(lines, marginX + 4, y + 14);

    y += boxHeight + 6;
  };

  drawTextSection("NCR Description", ncr.ncr_description);
  drawTextSection("Root Cause Analysis", ncr.root_cause_analysis);
  drawTextSection("Corrective & Preventive Action", ncr.corrective_preventive_action);

  // ==========================
  // SIGNATURE BLOCK
  // ==========================

  ensureSpace(34);

  const sigWidth = contentWidth / 3;
  const sigGap = 4;
  const sigY = y + 4;

  const sigLabels = [
    ["Initiator", ncr.initiator_name],
    ["Closed By", ncr.closed_by || "-"],
    ["Contractor", ncr.contractor],
  ];
  sigLabels.forEach(([label, value], idx) => {
    const x = marginX + idx * sigWidth;

    doc.setDrawColor(...colorBorder);
    doc.setLineWidth(0.2);
    doc.rect(x, sigY, sigWidth - sigGap, 24);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...colorPrimary);
    doc.text(String(label).toUpperCase(), x + 3, sigY + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...colorTextDark);
    doc.text(String(value || "-"), x + 3, sigY + 11);

    doc.setDrawColor(...colorTextMuted);
    doc.setLineWidth(0.2);
    doc.line(x + 3, sigY + 19, x + sigWidth - sigGap - 3, sigY + 19);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...colorTextMuted);
    doc.text("Signature", x + 3, sigY + 22.5);
  });

  y = sigY + 24 + 6;

  // ==========================
  // ATTACHMENTS (all photographs laid out together, grid style,
  // fitting on a single page whenever the count allows)
  // ==========================

  if (
    ncr.attachments &&
    ncr.attachments.length > 0
  ) {

    let attachmentIndex = 0;

    const attCount = ncr.attachments.length;
    const gapX = 6;
    const gapY = 8;
    const attStartY = 34;
    const attBottomLimit = pageHeight - 25;

    const gridColsAtt =
      attCount <= 4 ? 2 : attCount <= 9 ? 3 : 4;

    const cellW = (contentWidth - (gridColsAtt - 1) * gapX) / gridColsAtt;

    const availH = attBottomLimit - attStartY;
    const rowsNeeded = Math.ceil(attCount / gridColsAtt);
    let cellH = Math.min(85, (availH - (rowsNeeded - 1) * gapY) / rowsNeeded);
    cellH = Math.max(cellH, 40);

    const drawAttachmentPageHeader = () => {
      doc.setFillColor(...colorPrimary);
      doc.rect(0, 0, pageWidth, 20, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(
        "NCR Attachments",
        marginX,
        13
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(
        `NCR No: ${ncr.ncr_number || "-"}`,
        pageWidth - marginX,
        13,
        { align: "right" }
      );

      doc.setTextColor(...colorTextMuted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(
        `${attCount} attachment(s)`,
        marginX,
        27
      );
    };

    doc.addPage();
    drawAttachmentPageHeader();

    let attX = marginX;
    let attY = attStartY;
    let colIndex = 0;

    for (const attachment of ncr.attachments) {

      attachmentIndex += 1;

      if (attY + cellH > attBottomLimit) {
        doc.addPage();
        drawAttachmentPageHeader();
        attX = marginX;
        attY = attStartY;
        colIndex = 0;
      }

      doc.setDrawColor(...colorBorder);
      doc.setLineWidth(0.3);
      doc.rect(attX, attY, cellW, cellH);

      const captionH = 6;
      const imgAreaH = cellH - captionH - 3;
      const imgAreaW = cellW - 6;

      try {

        const img = await getBase64FromUrl(
          attachment.image_url
        );

        doc.addImage(
          img,
          "JPEG",
          attX + 3,
          attY + 3,
          imgAreaW,
          imgAreaH
        );

      } catch (err) {

        console.log(err);

        doc.setTextColor(...colorErrorText);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        doc.text(
          "Unable to load image.",
          attX + cellW / 2,
          attY + imgAreaH / 2 + 3,
          { align: "center" }
        );

      }

      doc.setDrawColor(...colorBorder);
      doc.setLineWidth(0.2);
      doc.line(attX + 2, attY + cellH - captionH, attX + cellW - 2, attY + cellH - captionH);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...colorTextMuted);
      doc.text(
        `Attachment ${attachmentIndex} of ${attCount}`,
        attX + cellW / 2,
        attY + cellH - 2,
        { align: "center" }
      );

      colIndex += 1;
      if (colIndex >= gridColsAtt) {
        colIndex = 0;
        attX = marginX;
        attY += cellH + gapY;
      } else {
        attX += cellW + gapX;
      }

    }

  }

  // ==========================
  // FOOTER
  // ==========================

  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {

    doc.setPage(i);

    doc.setDrawColor(...colorBorder);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 15, pageWidth - marginX, pageHeight - 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colorTextMuted);

    doc.text(
      "NCR Detail Report",
      marginX,
      pageHeight - 10
    );

    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      {
        align: "center",
      }
    );

    doc.text(
      String(ncr.ncr_number || "-"),
      pageWidth - marginX,
      pageHeight - 10,
      { align: "right" }
    );

  }

  doc.save(`${ncr.ncr_number}.pdf`);

};