import React from "react";
import { Dropdown, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface Props {
    menuItems: MenuProps['items'];
    handleMenuClick: MenuProps['onClick'];
    open: boolean;
    onOpenChange: (flag: boolean) => void;
}

const MenuComponent: React.FC<Props> = ({ menuItems, handleMenuClick, open, onOpenChange }) => (
    <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        trigger={['click']}
        open={open}
        onOpenChange={onOpenChange}
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
);

export default MenuComponent;
