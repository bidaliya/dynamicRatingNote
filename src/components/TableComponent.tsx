import React, { useState } from "react";
import { Table, MenuProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableComponent as TableData } from "../DataInterface";
import MenuComponent from "./MenuComponent";

interface Props {
    tableData: TableData;
    menuItems: MenuProps['items'];
    handleMenuClick: MenuProps['onClick'];
}

const TableComponent: React.FC<Props> = ({ tableData, menuItems, handleMenuClick }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleOpenChange = (flag: boolean) => {
        setOpenDropdown(flag);
    };

    const columns: ColumnsType<any> = tableData.rows[0].data.map((col, index) => ({
        title: col.value,
        dataIndex: `col${index + 1}`,
        key: `col${index + 1}`,
        render: (text: string, record: any) => {
            const cellData = tableData.rows[record.key + 1]?.data[index]; 
            const bgColor = cellData?.bgColor || '#ffffff'; 

            return (
                <div
                    style={{
                        backgroundColor: bgColor,
                        padding: '8px',
                        width: '400px',
                    }}
                >
                    {text}
                </div>
            );
        },
    }));

    const dataSource = tableData.rows.slice(1).map((row, rowIndex) => {
        const rowData: any = {};
        row.data.forEach((col, colIndex) => {
            rowData[`col${colIndex + 1}`] = col.value;
        });
        return {
            key: rowIndex,
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
                title={() => (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {tableData.label}
                        <MenuComponent
                            menuItems={menuItems}
                            handleMenuClick={handleMenuClick}
                            open={openDropdown}
                            onOpenChange={handleOpenChange}
                        />
                    </div>
                )}
                footer={tableData.footer ? () => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {tableData.footer}
                    </div>
                ) : undefined}
            />
        </div>
    );
};

export default TableComponent;