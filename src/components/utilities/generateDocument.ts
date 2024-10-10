import {
    Document,
    Packer,
    Paragraph,
    Table,
    TableRow,
    TableCell,
    TextRun,
  } from "docx";
  import { saveAs } from "file-saver";
  import { TableComponent, TextComponent } from "./../../DataInterface";
  
  export const handleDownloadClick = (
    componentsData: Array<TableComponent | TextComponent>
  ) => {
    // Convert pixels to inches
    const pxToInches = (px: number) => px / 96;
  
    const doc = new Document({
      sections: [
        {
          children: [
            ...componentsData
              .filter((component) => component.type === "table")
              .flatMap((component) => {
                const table = component as TableComponent;
                const rows = table.rows || [];
  
                // Create a label paragraph for the table with margins
                const labelParagraph = new Paragraph({
                  children: [
                    new TextRun({
                      text: table.label?.text || `Table ID: ${table.id}`,
                      color: table.label?.styles?.color
                        ? table.label.styles.color.replace("#", "")
                        : "000000",
                    }),
                  ],
                  // Set margins using `indent` for left/right and `spacing` for top/bottom
                  indent: {
                    left: table.label?.styles?.margin?.left
                      ? Math.round(pxToInches(parseInt(table.label.styles.margin.left)) * 1440)
                      : 0,
                    right: table.label?.styles?.margin?.right
                      ? Math.round(pxToInches(parseInt(table.label.styles.margin.right)) * 1440)
                      : 0,
                  },
                  spacing: {
                    before: table.label?.styles?.margin?.top
                      ? Math.round(pxToInches(parseInt(table.label.styles.margin.top)) * 1440)
                      : 0,
                    after: table.label?.styles?.margin?.bottom
                      ? Math.round(pxToInches(parseInt(table.label.styles.margin.bottom)) * 1440)
                      : 0,
                  },
                });
  
                if (rows.length === 0) {
                  return [
                    labelParagraph,
                    new Paragraph(""),
                  ];
                }
  
                // Ensure to use the first row for the header
                const headerRow = new TableRow({
                  children: rows[0].data.map(
                    (col) =>
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: col.value,
                                bold: true,
                                color: col.styling?.color || "000000",
                              }),
                            ],
                          }),
                        ],
                        shading: {
                          fill: col.bgColor || "FFFFFF",
                        },
                      })
                  ),
                });
  
                // Create rows for all rows except the first one (header)
                const dataRows = rows.slice(1).map((row) => {
                  return new TableRow({
                    children: row.data.map(
                      (col) =>
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: col.value,
                                  color: col.styling?.color || "000000",
                                }),
                              ],
                            }),
                          ],
                          shading: {
                            fill: col.bgColor || row.bgColor || "FFFFFF",
                          },
                        })
                    ),
                  });
                });
  
                // Prepare the footer for the table if present
                const footerParagraph = table.footer?.text
                  ? new Paragraph({
                      children: [
                        new TextRun({
                          text: table.footer?.text,
                          color: table.footer?.styles?.color
                            ? table.footer.styles.color.replace("#", "")
                            : "000000",
                        }),
                      ],
                    })
                  : null;
  
                // Return label, table rows, and footer
                return [
                  labelParagraph,
                  new Table({
                    rows: [headerRow, ...dataRows],
                  }),
                  footerParagraph ? footerParagraph : new Paragraph(""), 
                ];
              }),
            // Handle text components
            ...componentsData
              .filter((component) => component.type === "text")
              .map((component) => {
                const textComponent = component as TextComponent;
  
                // Create a paragraph for the text component with margins
                return new Paragraph({
                  children: [
                    new TextRun({
                      text: textComponent.label,
                    }),
                  ],
                  // Set margins using `indent` for left/right and `spacing` for top/bottom
                  indent: {
                    left: textComponent.styles?.margin?.left
                      ? Math.round(pxToInches(parseInt(textComponent.styles.margin.left)) * 1440)
                      : 0, // Default left margin
                    right: textComponent.styles?.margin?.right
                      ? Math.round(pxToInches(parseInt(textComponent.styles.margin.right)) * 1440)
                      : 0, // Default right margin
                  },
                  spacing: {
                    before: textComponent.styles?.margin?.top
                      ? Math.round(pxToInches(parseInt(textComponent.styles.margin.top)) * 1440)
                      : 0, // Default top margin
                    after: textComponent.styles?.margin?.bottom
                      ? Math.round(pxToInches(parseInt(textComponent.styles.margin.bottom)) * 1440)
                      : 0, // Default bottom margin
                  },
                });
              }),
          ],
        },
      ],
    });
  
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "MyDocument.docx");
    });
  };
  