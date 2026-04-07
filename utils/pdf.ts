import { formatPrice } from "./format";

export interface BlueprintLineItem {
  name: string;
  detail: string;
  price: number;
  quantity: number;
}

export const downloadBlueprintPDF = async (
  lineItems: BlueprintLineItem[],
  total: number,
  filename = "office-blueprint.pdf"
) => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 40;
  const tableLeft = margin;
  const colItem = margin;
  const colCategory = margin + 260;
  const colQty = margin + 400;
  const colPrice = margin + 480;
  const tableRight = margin + 520;
  const pageBottom = 740;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const watermarkFontSize = 120;
  const watermarkY = pageHeight / 2 + watermarkFontSize / 4;
  let cursorY = 60;

  const drawWatermark = () => {
    if (typeof (doc as any).saveGraphicsState === "function") {
      doc.saveGraphicsState();
    }
    if (typeof (doc as any).setGState === "function" && typeof (doc as any).GState === "function") {
      doc.setGState(new (doc as any).GState({ opacity: 0.02 }));
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(watermarkFontSize);
    doc.setTextColor(232, 96, 44);
    doc.text("MONIS", pageWidth / 2, watermarkY, {
      align: "center",
      baseline: "middle",
      angle: 45,
    });

    if (typeof (doc as any).restoreGraphicsState === "function") {
      doc.restoreGraphicsState();
    }
    doc.setTextColor(0, 0, 0);
  };

  drawWatermark();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Office Designer Blueprint", pageWidth / 2, cursorY, { align: "center" });
  cursorY += 30;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Created: ${new Date().toLocaleDateString()}`, margin, cursorY);
  cursorY += 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Ordered items:", margin, cursorY);
  cursorY += 18;

  const headerHeight = 24;
  doc.setFillColor(245, 245, 245);
  doc.rect(tableLeft, cursorY, tableRight - tableLeft, headerHeight, "F");
  doc.setDrawColor(210);
  doc.rect(tableLeft, cursorY, tableRight - tableLeft, headerHeight);
  doc.setFontSize(11);
  doc.text("Item", colItem + 4, cursorY + 16);
  doc.text("Category", colCategory + 4, cursorY + 16);
  doc.text("Qty", colQty + 4, cursorY + 16);
  doc.text("Price", tableRight - 4, cursorY + 16, { align: "right" });
  cursorY += headerHeight;

  doc.setDrawColor(220);
  doc.setFont("helvetica", "normal");

  if (lineItems.length === 0) {
    doc.text("No items selected.", margin, cursorY + 12);
    cursorY += 28;
  }

  const itemColWidth = colCategory - colItem - 8;
  const categoryColWidth = colQty - colCategory - 8;
  const rowSpacing = 8;

  const renderHeader = () => {
    // Add background logo watermark for new pages
    drawWatermark();

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(245, 245, 245);
    doc.rect(tableLeft, cursorY, tableRight - tableLeft, headerHeight, "F");
    doc.setDrawColor(210);
    doc.rect(tableLeft, cursorY, tableRight - tableLeft, headerHeight);
    doc.setFontSize(11);
    doc.text("Item", colItem + 4, cursorY + 16);
    doc.text("Category", colCategory + 4, cursorY + 16);
    doc.text("Qty", colQty + 4, cursorY + 16);
    doc.text("Price", tableRight - 4, cursorY + 16, { align: "right" });
    cursorY += headerHeight;
    doc.setFont("helvetica", "normal");
  };

  lineItems.forEach((item) => {
    const itemLines = doc.splitTextToSize(item.name, itemColWidth);
    const categoryLines = doc.splitTextToSize(item.detail, categoryColWidth);
    const rowLineCount = Math.max(itemLines.length, categoryLines.length);
    const rowHeight = rowLineCount * 14 + rowSpacing;

    if (cursorY + rowHeight > pageBottom) {
      doc.addPage();
      cursorY = 60;
      renderHeader();
    }

    const rowTop = cursorY;
    doc.setDrawColor(220);
    doc.line(tableLeft, rowTop + rowHeight, tableRight, rowTop + rowHeight);

    doc.text(itemLines, colItem + 4, cursorY + 14);
    doc.text(categoryLines, colCategory + 4, cursorY + 14);
    doc.text(String(item.quantity), colQty + 4, cursorY + 14);
    doc.text(item.price === 0 ? "Free" : formatPrice(item.price), tableRight - 4, cursorY + 14, { align: "right" });
    cursorY += rowHeight;
  });

  if (cursorY + 40 > pageBottom) {
    doc.addPage();
    drawWatermark();
    cursorY = 60;
  }

  cursorY += 8;
  doc.setDrawColor(180);
  doc.setLineWidth(0.8);
  doc.line(tableLeft, cursorY, tableRight, cursorY);
  cursorY += 16;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Total per week:", colCategory, cursorY);
  doc.text(formatPrice(total), tableRight - 4, cursorY, { align: "right" });

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
