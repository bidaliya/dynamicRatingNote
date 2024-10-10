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
    const pxToTwips = (px: number) => (px / 96) * 1440 * 0.5;
  
    const doc = new Document({
      sections: [
        {
          children: [
            ...componentsData
              .filter((component) => component.type === "table")
              .flatMap((component) => {
                const table = component as TableComponent;
                const rows = table.rows || [];
  
                const labelParagraph = new Paragraph({
                  children: [
                    new TextRun({
                      text: table.label?.text || `Table ID: ${table.id}`,
                      color: table.label?.styles?.color
                        ? table.label.styles.color.replace("#", "")
                        : "000000",
                    }),
                  ],
                  indent: {
                    left: table.label?.styles?.margin?.left
                      ? Math.round(pxToTwips(parseInt(table.label.styles.margin.left)))
                      : 0,
                    right: table.label?.styles?.margin?.right
                      ? Math.round(pxToTwips(parseInt(table.label.styles.margin.right)))
                      : 0,
                  },
                  spacing: {
                    before: table.label?.styles?.margin?.top
                      ? Math.round(pxToTwips(parseInt(table.label.styles.margin.top)))
                      : 0,
                    after: table.label?.styles?.margin?.bottom
                      ? Math.round(pxToTwips(parseInt(table.label.styles.margin.bottom)))
                      : 0,
                  },
                });
  
                if (rows.length === 0) {
                  return [
                    labelParagraph,
                    new Paragraph(`No data available for this table.`),
                    new Paragraph(""),
                  ];
                }
  
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
  
                return [
                  labelParagraph,
                  new Table({
                    rows: [headerRow, ...dataRows],
                  }),
                  footerParagraph ? footerParagraph : new Paragraph(""),
                ];
              }),
            ...componentsData
              .filter((component) => component.type === "text")
              .map((component) => {
                const textComponent = component as TextComponent;
  
                return new Paragraph({
                  children: [
                    new TextRun({
                      text: textComponent.label,
                    }),
                  ],
                  indent: {
                    left: textComponent.styles?.margin?.left
                      ? Math.round(pxToTwips(parseInt(textComponent.styles.margin.left)))
                      : 0,
                    right: textComponent.styles?.margin?.right
                      ? Math.round(pxToTwips(parseInt(textComponent.styles.margin.right)))
                      : 0,
                  },
                  spacing: {
                    before: textComponent.styles?.margin?.top
                      ? Math.round(pxToTwips(parseInt(textComponent.styles.margin.top)))
                      : 0,
                    after: textComponent.styles?.margin?.bottom
                      ? Math.round(pxToTwips(parseInt(textComponent.styles.margin.bottom)))
                      : 0,
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
  