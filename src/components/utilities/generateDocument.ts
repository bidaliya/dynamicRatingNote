import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun } from "docx";
import { saveAs } from "file-saver";
import { TableComponent, TextComponent } from './../../DataInterface';

export const handleDownloadClick = (componentsData: Array<TableComponent | TextComponent>) => {
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        text: "",
                        heading: "Heading1",
                    }),
                    ...componentsData
                        .filter((component) => component.type === "table")
                        .flatMap((component) => {
                            const table = component as TableComponent;
                            const rows = table.rows || [];

                            const labelParagraph = new Paragraph({
                                children: [
                                    new TextRun({
                                        text: table.label?.text || `Table ID: ${table.id}`,
                                        color: table.label?.styles?.color || "000000", // Default to black if no color is provided
                                        bold: true,
                                    }),
                                ],
                                shading: {
                                    fill: table.label?.styles?.bgcolor || "FFFFFF",
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
                                children: rows[0].data.map((col) =>
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: col.value,
                                                        bold: true,
                                                        color: col.styling?.color || "000000", // Defaults to black if no color is provided
                                                    }),
                                                ],
                                            }),
                                        ],
                                        shading: {
                                            fill: col.bgColor || "FFFFFF", // Use column-specific background color if available
                                        },
                                    })
                                ),
                            });
                            
                            

                            const tableRows = rows.map((row) => {
                                return new TableRow({
                                    children: row.data.map((col) =>
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: col.value,
                                                            color: col.styling?.color || "000000", // Default to black if no color is provided
                                                        }),
                                                    ],
                                                }),
                                            ],
                                            shading: {
                                                fill: row.bgColor || "FFFFFF", // Use the row's background color or default to white
                                            },
                                        })
                                    ),
                                });
                            });
                            
                            

                            return [
                                labelParagraph,
                                new Table({
                                    rows: [headerRow, ...tableRows],
                                }),
                                new Paragraph(""),
                            ];
                        }),
                    new Paragraph({
                        text: "",
                        heading: "Heading1",
                    }),
                    ...componentsData
                        .filter((component) => component.type === "text")
                        .map((component) => {
                            const TextComponent = component as TextComponent;
                            return new Paragraph(TextComponent.label);
                        }),
                ],
            },
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "MyDocument.docx");
    });
};
