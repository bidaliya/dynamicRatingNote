import React from "react";
import { MenuProps, notification, Button } from "antd";
import { Props, TableComponent as TableData, TextComponent as TextData } from "../DataInterface";
import TableComponent from "./TableComponent";
import TextComponent from "./TextComponent";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from "docx"; 

const DynamicScreen: React.FC<Props> = ({ componentsData }) => {
    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: 'Option 1',
        }
    ];

    const handleMenuClick: MenuProps['onClick'] = (e, tableId) => {
        // console.log('aaa', e.key);
        
        if (e.key === '1') {
            notification.success({
                message: 'Option 1 Clicked',
                description: `You clicked on the table with id ${tableId}.`,
                duration: 2,
            });
        }
    };

    const exportToWord = async () => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [],
                },
            ],
        });

        componentsData.forEach((component) => {
            if (component.type === "table") {
                const tableRows = component.rows.map(row => {
                    const cells = row.data.map(cell => {
                        return new TableCell({
                            children: [new Paragraph(cell.value)],
                        });
                    });
                    return new TableRow({
                        children: cells,
                    });
                });

                doc.addSection({
                    children: [
                        new Paragraph({
                            text: component.label,
                            heading: 'Heading1',
                        }),
                        new Table({
                            rows: tableRows,
                        }),
                    ],
                });
            } else if (component.type === "text") {
                doc.addSection({
                    children: [
                        new Paragraph({
                            text: component.label,
                        }),
                    ],
                });
            }
        });

        const blob = await Packer.toBlob(doc);

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ExportedDocument.docx';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <Button type="primary" onClick={exportToWord} style={{ marginBottom: '20px' }}>
                Export to Word
            </Button>
            {componentsData.map((component) =>
                component.type === "table" ? (
                    <TableComponent
                        key={component.id}
                        tableData={component as TableData}
                        menuItems={menuItems}
                        handleMenuClick={(e) => handleMenuClick(e, component.id)}
                    />
                ) : (
                    <TextComponent key={component.id} textData={component as TextData} />
                )
            )}
        </div>
    );
};

export default DynamicScreen;
