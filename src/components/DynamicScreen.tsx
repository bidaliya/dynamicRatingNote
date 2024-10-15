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
  const [data, setData] = useState<Array<TableData | TextData>>(componentsData);

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

  const downloadHandler = () => {
    handleDownloadClick(data);
  };

  // Function to update the label of a text component.
  const updateTextLabel = (id: number, newLabel: string) => {
    setData((prevData) =>
      prevData.map((component) =>
        component.type === "text" && component.id === id
          ? { ...component, label: newLabel }
          : component
      )
    );
  };

  return (
    <div>
      {data.map((component) =>
        component.type === "table" ? (
          <TableComponent
            key={component.id}
            tableData={component as TableData}
            menuItems={menuItems}
            handleMenuClick={handleMenuClick}
          />
        ) : (
          <TextComponent
            key={component.id}
            textData={component as TextData}
            updateLabel={updateTextLabel}
          />
        )
      )}
      <br />
      <Button type="primary" onClick={downloadHandler}>
        Download DOCX
      </Button>
    </div>
  );
};

export default DynamicScreen;
