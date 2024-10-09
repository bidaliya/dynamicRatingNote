import React from "react";
import { MenuProps, notification } from "antd";
import { Props, TableComponent as TableData, TextComponent as TextData } from "../DataInterface";
import TableComponent from "./TableComponent";
import TextComponent from "./TextComponent";

const DynamicScreen: React.FC<Props> = ({ componentsData }) => {
    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: 'Option 1',
        }
    ];

    const handleMenuClick: MenuProps['onClick'] = (e, tableId) => {
        if (e.key === '1') {
            notification.success({
                message: 'Option 1 Clicked',
                description: `You clicked on the table with id ${tableId}.`,
                duration: 2,
            });
        }
    };

    return (
        <div>
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
