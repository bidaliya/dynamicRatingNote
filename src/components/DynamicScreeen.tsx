import React, { useState } from "react";
import { Table, Typography, Button, Dropdown, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Props, TableComponent, TextComponent } from "../DataInterface";

const { Text } = Typography;

const DynamicScreen: React.FC<Props> = ({ componentsData }) => {
    // Use an object to track the open state of each table
    const [openDropdown, setOpenDropdown] = useState<{ [key: number]: boolean }>({});

    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: 'Option 1',
        },
        {
            key: '2',
            label: 'Option 2',
        },
        {
            key: '3',
            label: 'Option 3',
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('Menu item clicked:', e.key);
        // Close the dropdown after selecting an option
        setOpenDropdown({});
    };

    const handleOpenChange = (flag: boolean, tableId: number) => {
        setOpenDropdown((prev) => ({
            ...prev,
            [tableId]: flag, // Only open/close the dropdown for the specific table
        }));
    };

    const renderTable = (tableData: TableComponent) => {
        const columns: ColumnsType<any> = tableData.rows[0].data.map((col, index) => ({
            title: `${col.value}`,
            dataIndex: `col${index + 1}`,
            key: `col${index + 1}`,
            render: (text: string) => (
                <div key={index} style={{ backgroundColor: col.bgColor, width: '400px' }}>
                    {text}
                </div>
            ),
        }));

        const dataSource = tableData.rows
            .slice(1) // Exclude the header row
            .map((row, rowIndex) => {
                const rowData: any = {};
                row.data.forEach((col, colIndex) => {
                    rowData[`col${colIndex + 1}`] = col.value;
                });
                return {
                    key: rowIndex + 1, // Unique key for each row
                    ...rowData,
                };
            });

        return (
            <div key={tableData.id} style={{ position: 'relative' }}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    className="custom-bold-border"
                    title={() => {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {tableData.label}
                                <Dropdown
                                    menu={{ items: menuItems, onClick: handleMenuClick }}
                                    trigger={['click']}
                                    open={openDropdown[tableData.id] || false} // Manage state for each table
                                    onOpenChange={(flag) => handleOpenChange(flag, tableData.id)}
                                    placement="bottomRight"
                                >
                                    <MoreOutlined
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '22px',
                                            color: 'gray',
                                        }}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                </Dropdown>
                            </div>
                        );
                    }}
                    footer={() => {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {tableData.footer}
                            </div>
                        )
                    }}
                />
            </div>
        );
    };

    const renderText = (textData: TextComponent) => (
        <div key={textData.id} style={{ marginRight: textData?.margin?.right ?? "0px" }}>
            <Text strong>{textData.label}</Text>
            <Button type="link" href={textData.link} target="_blank">
                Visit
            </Button>
        </div>
    );

    return (
        <div>
            {componentsData.map((component) =>
                component.type === "table"
                    ? renderTable(component as TableComponent)
                    : renderText(component as TextComponent)
            )}
        </div>
    );
};

export default DynamicScreen;
