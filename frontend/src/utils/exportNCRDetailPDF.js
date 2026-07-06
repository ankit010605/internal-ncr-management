import jsPDF from "jspdf";

const getBase64FromUrl = async (url) => {
  const response = await fetch(url);

  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);

    reader.readAsDataURL(blob);
  });
};

export const exportNCRDetailPDF = async (ncr) => {

  const doc = new jsPDF();

  // ==========================
  // HEADER
  // ==========================

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Internal NCR Report", 105, 18, {
    align: "center",
  });

  doc.setLineWidth(0.5);
  doc.line(10, 25, 200, 25);

  let y = 35;

  doc.setFontSize(12);

  const addRow = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 15, y);

    doc.setFont("helvetica", "normal");
    doc.text(String(value || "-"), 75, y);

    y += 8;
  };

  addRow("NCR Number", ncr.ncr_number);
  addRow("Project", ncr.project_name);
  addRow("Drawing", ncr.drawing_number);
  addRow("Plant", ncr.plant);
  addRow("Bay", ncr.bay);
  addRow("Stage", ncr.stage);
  addRow("Status", ncr.status);
  addRow("Issue Date", ncr.issue_date);
  addRow("Target Closing", ncr.target_closing_date);
  addRow("Initiator", ncr.initiator_name);
  addRow("Responsible", ncr.responsible_person);
  addRow("Contractor", ncr.contractor);

  y += 5;

  doc.setFont("helvetica", "bold");
  doc.text("NCR Description", 15, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const desc = doc.splitTextToSize(
    ncr.ncr_description || "-",
    180
  );

  doc.text(desc, 15, y);

  y += desc.length * 7 + 8;

  doc.setFont("helvetica", "bold");
  doc.text("Root Cause Analysis", 15, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const root = doc.splitTextToSize(
    ncr.root_cause_analysis || "-",
    180
  );

  doc.text(root, 15, y);

  y += root.length * 7 + 8;

  doc.setFont("helvetica", "bold");
  doc.text("Corrective & Preventive Action", 15, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const action = doc.splitTextToSize(
    ncr.corrective_preventive_action || "-",
    180
  );

  doc.text(action, 15, y);

  // ==========================
  // ATTACHMENTS
  // ==========================

  if (
    ncr.attachments &&
    ncr.attachments.length > 0
  ) {

    for (const attachment of ncr.attachments) {

      doc.addPage();

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");

      doc.text(
        "NCR Attachment",
        15,
        20
      );

      try {

        const img = await getBase64FromUrl(
          attachment.image_url
        );

        doc.addImage(
          img,
          "JPEG",
          15,
          30,
          180,
          120
        );

      } catch (err) {

        console.log(err);

        doc.setFontSize(12);

        doc.text(
          "Unable to load image.",
          15,
          40
        );

      }

    }

  }

  // ==========================
  // FOOTER
  // ==========================

  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {

    doc.setPage(i);

    doc.setFontSize(10);

    doc.text(
      `Page ${i} of ${totalPages}`,
      105,
      290,
      {
        align: "center",
      }
    );

  }

  doc.save(`${ncr.ncr_number}.pdf`);

};