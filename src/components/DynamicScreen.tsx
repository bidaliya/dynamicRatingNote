import React, { useState } from "react";
import { Button, MenuProps, notification } from "antd";
import {
  Props,
  TableComponent as TableData,
  TextComponent as TextData,
} from "../DataInterface";
import TableComponent from "./TableComponent";
import TextComponent from "./TextComponent";
import { handleDownloadClick } from "./utilities/generateDocument";

const DynamicScreen: React.FC<Props> = ({ componentsData }) => {
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Option 1",
    },
  ];

  const handleMenuClick = (tableId: number) => {
    notification.success({
      message: "Option 1 Clicked",
      description: `You clicked on the table with id ${tableId}.`,
      duration: 2,
    });
  };

  const handleDataUpdate = (data: { key: number; value: string })=>{
    componentsData.map((item, ind)=>{
      if(item.id == data.key && item.type == 'text'){
        item.label = data.value
      }
    })
  }

  const downloadHandler = () => {
    handleDownloadClick(componentsData);
  };

  return (
    <div>
      {componentsData.map((component) =>
        component.type === "table" ? (
          <TableComponent
            key={component.id}
            tableData={component as TableData}
            menuItems={menuItems}
            handleMenuClick={handleMenuClick}
          />
        ) : (
          <TextComponent key={component.id} textData={component as TextData} setData = {handleDataUpdate}/>
        )
      )}
      <Button type="primary" onClick={downloadHandler}>
        Download DOCX
      </Button>
    </div>
  );
};

export default DynamicScreen;
